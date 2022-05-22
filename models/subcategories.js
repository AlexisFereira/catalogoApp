const mongoose = requrie('mongoose');
const {Schema} = mongoose();
const subCategorieSchema = new Schema({
  name:{
    type:String,
    required:[true,"Nombre del categoria es requerido."]
  },
  clienId:{
    type:mongoose.Types.ObjectId,
    ref:'Users'
  },
  parentCategorie:{
    type:mongoose.Types.ObjectId,
    ref:'Categories'
  }
})

module.exports = mongoose.model('SubCategorie',subCategorieSchema);