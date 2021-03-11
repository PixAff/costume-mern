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
    default: "",
  },
  place: {
    type: String,
    trim: true,
    default: "",
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  notes: {
    type: String,
    trim: true,
    default: "",
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
  roles: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Role",
    },
  ],
});

const Scene = mongoose.model("Scene", sceneSchema);

export default Scene;
