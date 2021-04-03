import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const costumeSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a name!",
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
  role: {
    type: mongoose.Schema.ObjectId,
    ref: "Role",
    required: "You must supply a role!",
  },

  days: [{ type: Number }],

  images: [{ type: String }],
});

const Costume = mongoose.model("Costume", costumeSchema);

export default Costume;
