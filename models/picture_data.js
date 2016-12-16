const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const picture = new Schema({
  imageURL:String,
  imageName:String,
  likes:Number,
  userID:String,
  userImage:String,
  colour:String,
  broken:Boolean
})

const ModelClass = mongoose.model('picture_data', picture);

module.exports = ModelClass;
