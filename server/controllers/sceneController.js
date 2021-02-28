import mongoose from "mongoose";
import Script from "../models/Script.js";
import Scene from "../models/Scene.js";

export const createScene = async (req, res) => {
  const { sceneNumber, playDay, mood, place } = req.body.scene;
  const { script } = req.body;

  const newScene = new Scene({ sceneNumber, playDay, mood, script, place });
  try {
    await newScene.save();

    res.status(201).json(newScene);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getScenes = async (req, res) => {
  console.log("TODO: WHY DOES ROUTING NOT WORK WITHOUT :ID");
  try {
    const scenes = await Scene.find({
      script: req.params.id,
    }).sort({ sceneNumber: "asc" });
    console.log(scenes.map((scene) => scene.script));
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
  const { id, sceneNumber, playDay, mood, place } = req.body;
  console.log("TODO: refactor body to hole scene (scene: {...}");
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No scene with id: ${id}`);

  const updatedScene = { sceneNumber, playDay, mood, place, _id: id };

  await Scene.findByIdAndUpdate(id, updatedScene, { new: true });

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

// export const likeScript = async (req, res) => {
//   const { id } = req.params;
//   const script = await Script.findById(id);
//   const updatedScript = await Script.findByIdAndUpdate(
//     id,
//     {
//       liked: script.liked + 1,
//     },
//     {
//       new: true, // return the updated script
//       runValidators: true,
//     }
//   );
//   res.json(updatedScript);
// };
