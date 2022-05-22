const mongoose = require("mongoose");
const { Schema } = mongoose;

const typeSocialMedia = new Schema({
  name:{
    type:String,
    require:[true,"must add name of social net"],
    enum:["facebook","instagram","what's app", "twitter","tick tok"]
  },
  url:{
    type:String,
    require:[true,"Must add url of social media profile"]
  }
})

const typePhone = new Schema({
  type:{
    type:String,
    enum:["mobile","home"],
    require:[true,'Must add type of phone']
  },
  number:{
    type:Number,
    maxlength: 10,
    minlength: 7,
    require:[true,'Must phone number']
  }
})

const information = new Schema({
  address:{
    type:String,
  },
  phone:{
    type:[typePhone]
  },
  socialMedia:{
    type:[typeSocialMedia]
  },
  delivery:{
    type:Boolean,
    default:false
  },
  webpage:{
    type:String
  }
})

const CategorySchema = new Schema({
  categoryId:{
    type:mongoose.Types.ObjectId,
    require:[true,"Id of category is required."]
  },
  parentCategory:{
    type: mongoose.Types.ObjectId || null,
  }
})

const catalogSchema = new Schema({
  name: {
    type: String,
    required: [true, "Catalog name is required."],
  },
  description:{
    type:String,
  },
  img: {
    type: String, //logo del comercio
  },
  productsAllowed: {
    type: Number,
    default: 10,
  },
  clientId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: [true, "Client id is required."],
  },
  categoriesAllowed: {
    type: Number,
    default: 4,
  },
  categories: {
    type: [CategorySchema],
  },
  subCatoriesAllowed: {
    type: Number,
    default: 2,
  },
  information:{
    type: information
  },
  imagesInProductsAllowed: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Catalog", catalogSchema);
