import mongoose from "mongoose";
import Script from "../models/Script.js";
import Scene from "../models/Scene.js";
import Role from "../models/Role.js";

function handleError(res, error) {
  let errorsMsg = [];
  if (error.errors) {
    console.log("1", error, error.errors);
    Object.entries(error.errors).forEach(([key, value]) =>
      errorsMsg.push({
        path: value.properties.path,
        msg: value.properties.message,
      })
    );
  } else {
    errorsMsg.push({ path: "MongoError", msg: error.code });
  }
  res.status(422).json({ message: errorsMsg });
}

export const createRole = async (req, res) => {
  console.log(req.body);
  const { name, actor, notes, category } = req.body;
  const script = req.params.scriptid;

  const newRole = new Role({
    name,
    actor,
    notes,
    category,
    script,
  });

  console.log(newRole);
  try {
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    handleError(res, error);
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({
      script: req.params.scriptid,
    });
    // .populate("script");
    // console.log(roles.map((role) => role));
    res.status(200).json(roles);
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

// export const updateScene = async (req, res) => {
//   const { id, sceneNumber, playDay, mood, place, description } = req.body;
//   console.log("TODO: refactor body to hole scene (scene: {...}");
//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send(`No scene with id: ${id}`);

//   const updatedScene = {
//     sceneNumber,
//     playDay,
//     mood,
//     place,
//     description,
//     _id: id,
//   };

//   await Scene.findByIdAndUpdate(id, updatedScene, { new: true });

//   res.status(200).json(updatedScene);
// };

export const deleteRole = async (req, res) => {
  const role = await Role.findByIdAndRemove(
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
