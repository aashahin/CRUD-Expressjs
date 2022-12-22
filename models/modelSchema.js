const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Require"],
      unique: [true, "Must be Unique"],
      minimum: [3, "Words Minimum is 3"],
      maximum: [32, "Words Maximum is 32"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);
module.exports = { categorySchema, Category };
