import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const sceneSchema = mongoose.Schema({
  sceneNumber: {
    type: Number,
    default: 0,
    required: "Please enter a scene number!",
  },
  playDay: {
    type: Number,
    default: 0,
  },
  mood: {
    type: String,
    trim: true,
  },
  place: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  script: {
    type: mongoose.Schema.ObjectId,
    ref: "Script",
    required: "You must supply a script!",
  },
});

const Scene = mongoose.model("Scene", sceneSchema);

export default Scene;
