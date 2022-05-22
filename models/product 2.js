const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionVariation = new Schema({
  name: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    deafult: true,
  },
});

const variation = new Schema({
  title: {
    type: String,
    required: [true, "Title variation required."],
  },
  maxSelection: {
    type: Number,
    required: [true, "MaxSelection variation required."],
  },
  options: {
    type: [optionVariation],
    minlength: 2,
    required: [true, "Option in variation required."],
  },
});

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name required."],
  },
  price: {
    type: Number,
    required: [true, "Price required."],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  variations: {
    type: [variation],
  },
  catalogId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Catalog id is required."],
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
