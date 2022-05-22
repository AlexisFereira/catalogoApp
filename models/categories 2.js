const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorieSchema = new Schema({
  name: {
    type: String,
    required: [true, "Category name is required."],
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  isGeneric:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("Categories", CategorieSchema);
