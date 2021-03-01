import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const roleSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: "Please enter a name!",
  },
  actor: {
    type: String,
    trim: true,
    unique: true,
  },
  notes: {
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

const Role = mongoose.model("Role", roleSchema);

export default Role;
