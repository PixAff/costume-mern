import mongoose from "mongoose";
mongoose.Promise = global.Promise;
import slug from "slugs";

const scriptSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Please enter a script name!",
    },
    slug: String,
    description: {
      type: String,
      trim: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    liked: {
      type: Number,
      default: 0,
    },

    // photo: String,
    //   author: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: "You must supply an author",
    //   },
  }
  // {
  //   toJSON: { virtuals: true }, // populate virtuals when convert to JSON or Object - default === false
  //   toObject: { virtuals: true },
  // }
);

//   scriptSchema.index({
//     name: "text",
//     description: "text",
//   });

//   scriptSchema.index({ location: "2dsphere" });

scriptSchema.pre("save", async function (next) {
  if (!this.isModified("name")) {
    next(); // skips if the name is not modified
    return;
  }

  this.slug = slug(this.name);
  const slugRegEx = new RegExp(`^({this.slug})((-[0-9]*$)?)$`, "i");
  const scriptWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (scriptWithSlug.length) {
    this.slug = `${this.slug}-${scriptWithSlug.length + 1}`;
  }
  next();
});

//   scriptSchema.statics.getTagsList = function () {
//     return this.aggregate([
//       { $unwind: "$tags" },
//       { $group: { _id: "$tags", count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//     ]);
//   };

//   scriptSchema.statics.getTopscripts = function () {
//     return this.aggregate([
//       // lookup scripts and populate their reviews
//       {
//         $lookup: {
//           from: "reviews",
//           localField: "_id",
//           foreignField: "script",
//           as: "reviews",
//         },
//       },
//       // filter for only scripts with at least 2 reviews
//       { $match: { "reviews.1": { $exists: true } } },
//       // add average field
//       {
//         $project: {
//           averageRating: { $avg: "$reviews.rating" },
//           // project removes all other fields - we need to add them back in
//           photo: "$$ROOT.photo",
//           name: "$$ROOT.name",
//           reviews: "$$ROOT.reviews",
//           slug: "$$ROOT.slug",
//         },
//       },
//       // sort by new field "averageRating"
//       { $sort: { averageRating: -1 } },
//       // limit to 10
//       { $limit: 10 },
//     ]);
//   };

//   function autoPopulate(next) {
//     this.populate("reviews");
//     next();
//   }

//   scriptSchema.pre("find", autoPopulate);
//   scriptSchema.pre("findOne", autoPopulate);

// // find reviews where the script _id === reviews script property:
// scriptSchema.virtual("scenes", {
//   ref: "Scene", // what model to link
//   localField: "_id", // which field on the script
//   foreignField: "script", // which field onn the review
// });

const Script = mongoose.model("Script", scriptSchema);

export default Script;
