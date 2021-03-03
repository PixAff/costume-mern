import mongoose from "mongoose";
import dotenv from "dotenv";

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log(
    "You're on an older version of node! Please go to nodejs.org and download version 7.6 or greater. 👌\n "
  );
  process.exit();
}

// import environmental variables from our variables.env file
dotenv.config({ path: "./.env" });

// Connect to our Database and handle any bad connections

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to database"));
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!
// require("./models/Script");
// require("./models/User");
// require("./models/Review");

// Start our app!
import app from "./app.js";
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
