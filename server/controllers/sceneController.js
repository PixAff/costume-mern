import mongoose from "mongoose";
import Script from "../models/Script.js";
import Scene from "../models/Scene.js";

export const createScene = async (req, res) => {
  const { sceneNumber, playDay, mood, place, description } = req.body;
  const script = req.params.scriptid;

  const newScene = new Scene({
    sceneNumber,
    playDay,
    mood,
    script,
    place,
    description,
  });
  try {
    await newScene.save();

    res.status(201).json(newScene);
  } catch (error) {
    res.status(409).json({ message: error.message });
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
    console.log(scenes.map((scene) => scene));
    res.status(200).json(scenes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getScript = async (req, res) => {
//   console.log("single");
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send(`No script with id: ${id}`);

//   const script = await Script.findOne({ _id: id });

//   res.json(script);
// };

export const updateScene = async (req, res) => {
  const { _id, sceneNumber, playDay, mood, place, description } = req.body;
  console.log("TODO: refactor body to hole scene (scene: {...}");
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No scene with id: ${_id}`);

  const updatedScene = {
    sceneNumber,
    playDay,
    mood,
    place,
    description,
    _id,
  };

  await Scene.findByIdAndUpdate(_id, updatedScene, { new: true });

  res.status(200).json(updatedScene);
};

export const deleteScene = async (req, res) => {
  const scene = await Scene.findByIdAndRemove(
    { _id: req.params.id },
    function (err) {
      // if (err) return handleError(err);
      if (err) console.log(err);
    }
  );
  res.json({ message: `${req.params.id} removed`, id: req.params.id });
};

export const addRolesToScene = async (req, res) => {
  // roles gets deleted and reset every time -> this fn solves all crud actions
  const id = req.body.scene._id;
  const updatedScene = req.body.scene;
  updatedScene.roles = req.body.roles;
  await Scene.findByIdAndUpdate(id, updatedScene, { new: true });
  res.status(200).json(updatedScene);
};
