import mongoose from "mongoose";
import Script from "../models/Script.js";
import Scene from "../models/Scene.js";

export const createScene = async (req, res) => {
  console.log("TODO: refactor body to hole scene (scene: {...}");
  const { sceneNumber, playDay, mood, place, description, notes } = req.body;
  const script = req.params.scriptid;

  const newScene = new Scene({
    sceneNumber,
    playDay,
    mood,
    script,
    place,
    description,
    notes,
  });
  try {
    await newScene.save();

    res.status(201).json(newScene);
  } catch (error) {
    console.log(error.errors);
    res.status(409).json({ message: error.errors });
  }
};

export const getScenes = async (req, res) => {
  try {
    const scenes = await Scene.find({
      script: req.params.scriptid,
    })
      // .sort({ sceneNumber: "asc" })
      .populate("script")
      .populate("roles");
    // console.log(scenes.map((scene) => scene));
    res.status(200).json(scenes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateScene = async (req, res) => {
  const updatedScene = req.body;
  if (!mongoose.Types.ObjectId.isValid(updatedScene._id))
    return res.status(404).send(`No scene with id: ${updatedScene._id}`);
  try {
    await Scene.findByIdAndUpdate(updatedScene._id, updatedScene, {
      runValidators: true,
      new: true,
    });
    res.status(200).json(updatedScene);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const deleteScene = async (req, res) => {
  try {
    const scene = await Scene.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json(scene._id);
  } catch (error) {
    console.log("ERR", err);
    res.status(409).json(err);
  }
};

export const addRolesToScene = async (req, res) => {
  // roles gets deleted and reset every time -> this fn solves all crud actions
  const id = req.body.scene._id;
  const updatedScene = req.body.scene;
  updatedScene.roles = req.body.roles;
  await Scene.findByIdAndUpdate(id, updatedScene, { new: true });
  res.status(200).json(updatedScene);
};
