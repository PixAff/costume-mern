import mongoose from "mongoose";
import Script from "../models/Script.js";
import Scene from "../models/Scene.js";
import Role from "../models/Role.js";

// const User = mongoose.model("User");

// const multer = require("multer");
// const jimp = require("jimp");
// const uuid = require("uuid");

// const multerOptions = {
//   storage: multer.memoryStorage(),
//   fileFilter(req, file, next) {
//     const isPhoto = file.mimetype.startsWith("image/");
//     if (isPhoto) {
//       next(null, true);
//     } else {
//       next({ message: "That filetype isn't allowed" }, false);
//     }
//   },
// };

// exports.homePage = (req, res) => {
//   res.render("index");
// };

// exports.addStore = (req, res) => {
//   res.render("editStore", { title: "Add store" });
// };

// exports.upload = multer(multerOptions).single("photo");

// exports.resize = async (req, res, next) => {
//   // check if there is no new file to resize
//   if (!req.file) {
//     next();
//     return;
//   }
//   const extension = req.file.mimetype.split("/")[1];
//   req.body.photo = `${uuid.v4()}.${extension}`;
//   // no we resize:
//   const photo = await jimp.read(req.file.buffer);
//   await photo.resize(800, jimp.AUTO);
//   await photo.write(`./public/uploads/${req.body.photo}`);
//   next();
// };
// console.log(Script);

export const createScript = async (req, res) => {
  const { name } = req.body;

  const newScript = new Script({ name });
  try {
    await newScript.save();
    res.status(201).json(newScript);
  } catch (error) {
    console.log(error.errors.name.properties.message);
    res.status(409).json({ message: error.errors });
  }
};

// export const createScript = async (req, res) => {
//   console.log("create backend");
//   // req.body.author = req.user._id;
//   console.log(req.body.name);
//   const script = await new Script({ name: req.body.name }).save();

//   // req.flash(
//   //   "success",
//   //   `Successfully created ${store.name}. Care to leave a review?`
//   // );
//   // res.redirect(`/stores/${store.slug}`);
//   res.send(script);
// };

export const getScripts = async (req, res) => {
  try {
    const scripts = await Script.find();
    res.status(200).json(scripts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getScripts = async (req, res) => {
//   //   const page = req.params.page || 1;
//   //   const limit = 4;
//   //   const skip = page * limit - limit;

//   const scripts = await Script.find();
//   // .skip(skip)
//   // .limit(limit)
//   // .sort({ created: "desc" });

//   //   const countPromise = Script.count();

//   //   const [stores, count] = await Promise.all([storesPromise, countPromise]);

//   //   const pages = Math.ceil(count / limit);
//   //   if (!stores.length && skip) {
//   //     res.redirect(`/stores/page/${pages}`);
//   //     return;
//   //   }
//   //   res.render("stores", { title: "Stores", stores, page, pages, count });
//   res.json(scripts);
// };

export const getScript = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Single script with id: ${id}`);

  const script = await Script.findOne({ _id: id });

  res.json(script);
};

// exports.getStore = async (req, res, next) => {
//   const store = await Store.findOne({ slug: req.params.slug }).populate(
//     "author"
//   );
//   if (!store) return next();
//   res.render("store", { title: store.name, store });
// };

// const confirmOwner = (store, user) => {
//   if (!store.author.equals(user._id)) {
//     throw Error("this ain`t ya store!");
//   }
// };

// export const updateScript = async (req, res) => {
//   const script = await Script.findOneAndUpdate(
//     { _id: req.params.id },
//     req.body,
//     {
//       new: true, // return the updated store
//       runValidators: true,
//     }
//   );
//   res.json(script);
// };

export const updateScript = async (req, res) => {
  // const { id } = req.params;
  const updateScript = req.body;

  if (!mongoose.Types.ObjectId.isValid(updateScript._id))
    return res
      .status(404)
      .send(`(update) No script with id: ${updateScript._id}`);

  // const updatedScript = { name, _id: id };
  try {
    await Script.findByIdAndUpdate(updateScript._id, updateScript, {
      runValidators: true,
      new: true,
    });

    res.status(200).json(updateScript);
  } catch (error) {
    console.log("ERR", error);
    res.status(409).json({ message: error.message });
  }
};

async function deleteCorrespondingScenes(script) {
  try {
    const scenes = await Scene.deleteMany({
      script: script,
    });
    console.log("Dele", scenes);
    return scenes.deletedCount;
  } catch (error) {
    console.log(error);
  }
}

async function deleteCorrespondingRoles(script) {
  try {
    const roles = await Role.deleteMany({ script });
    console.log("Dele", roles);
    return roles.deletedCount;
  } catch (error) {
    console.log(error);
  }
}

export const deleteScript = async (req, res) => {
  const message = {};
  try {
    const script = await Script.findByIdAndRemove(
      { _id: req.params.id }
      // function (err, doc) {
      //   // if (err) return handleError(err);
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(doc);
      //   }
      // }
    );
    message["script"] = script;
    message["deletedScenes"] = await deleteCorrespondingScenes(script);
    message["deletedRoles"] = await deleteCorrespondingRoles(script);
    console.log(message);
    // res.json({ message: `${script} removed` });
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const likeScript = async (req, res) => {
  const { id } = req.params;
  const script = await Script.findById(id);
  const updatedScript = await Script.findByIdAndUpdate(
    id,
    {
      liked: script.liked + 1,
    },
    {
      new: true, // return the updated script
      runValidators: true,
    }
  );
  res.json(updatedScript);
};

// exports.editStore = async (req, res) => {
//   const store = await Store.findOne({ _id: req.params.id });
//   confirmOwner(store, req.user);
//   res.render("editStore", { title: `Edit ${store.name}`, store });
// };

// exports.updateStore = async (req, res) => {
//   req.body.location.type = "Point";
//   const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
//     new: true, // return the updated store
//     runValidators: true,
//   }).exec();

//   req.flash(
//     "success",
//     `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`
//   );
//   res.redirect(`/stores/${store.id}/edit`);
// };

// exports.getStoresByTag = async (req, res) => {
//   const tag = req.params.tag;

//   const tagsPromise = Store.getTagsList();
//   const tagQuery = tag || { $exists: true }; // if there is no tag param - fall back to all stores with a tag
//   const storesPromise = Store.find({ tags: tagQuery });
//   const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

//   res.render("tags", { tag, tags, stores, title: "Tags" });
// };

// exports.searchStores = async (req, res) => {
//   const stores = await Store.find(
//     {
//       $text: {
//         $search: req.query.q,
//       },
//     },
//     { score: { $meta: "textScore" } }
//   ).sort({ score: { $meta: "textScore" } });
//   res.json(stores);
// };

// exports.mapStores = async (req, res) => {
//   const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
//   const q = {
//     location: {
//       $near: {
//         $geometry: {
//           type: "Point",
//           coordinates,
//         },
//         $maxDistance: 10000, // meters
//       },
//     },
//   };
//   const stores = await Store.find(q)
//     .select("slug name description photo location")
//     .limit(10);
//   res.json(stores);
// };

// exports.mapPage = async (req, res) => {
//   res.render("map", { title: "Map" });
// };

// exports.heartStore = async (req, res) => {
//   const hearts = req.user.hearts.map((obj) => obj.toString());
//   const operator = hearts.includes(req.params.id) ? "$pull" : "$addToSet";
//   const user = await User.findByIdAndUpdate(
//     req.user._id,
//     { [operator]: { hearts: req.params.id } },
//     { new: true }
//   );
//   res.json(user);
// };

// exports.getHeartedStores = async (req, res) => {
//   const heartedStores = await Store.find({ _id: req.user.hearts });
//   res.render("hearts", { heartedStores, title: "My favourites" });
// };

// exports.getTopStores = async (req, res) => {
//   const topStores = await Store.getTopStores();
//   res.render("topStores", { topStores, title: "Top 10 Stores" });
// };
