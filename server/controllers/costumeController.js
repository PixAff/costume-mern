import Costume from "../models/Costume.js";
import { cloudinary } from "../utils/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const fileString = req.body.data;
    const uploadedResponse = await cloudinary.v2.uploader.upload(fileString, {
      upload_preset: "costume",
      // tags: [req.body.costumeData.role, req.body.costumeData.name],
      context: {
        role: req.body.costumeData.role,
        costume: req.body.costumeData.name,
      },
    });
    console.log(uploadedResponse);
    const newCostume = new Costume({
      name: req.body.costumeData.name,
      role: req.body.costumeData.role,
      script: req.body.costumeData.script,
      images: [uploadedResponse.url],
    });

    try {
      await newCostume.save();

      res.status(201).json(newCostume);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getImages = async (req, res) => {
  const { roleId } = req.params;
  try {
    const { resources } = await cloudinary.v2.search
      .expression(`folder:costume AND context.role:${roleId}`)
      .with_field("context")
      .sort_by("public_id", "desc")
      .max_results(20)
      .execute();
    const publicIds = resources.map((file) => file.public_id);
    // console.log(resources);
    res.json(publicIds);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
