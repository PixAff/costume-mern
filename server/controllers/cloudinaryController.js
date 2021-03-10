import { cloudinary } from "../utils/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const fileString = req.body.data;
    const uploadedResponse = await cloudinary.v2.uploader.upload(fileString, {
      upload_preset: "costume",
    });
    console.log(uploadedResponse);
    res.json({ message: "Yay, that worked!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getImages = async (req, res) => {
  try {
    const { resources } = await cloudinary.v2.search
      .expression("folder:costume")
      .sort_by("public_id", "desc")
      .max_results(20)
      .execute();
    const publicIds = resources.map((file) => file.public_id);
    res.json(publicIds);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
