const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const user = new Schema({
  userImage:String,
  userName:String,
  colour:String,
  voted:[],
  facebook : {
      "id"    : String
            },
    twitter : {
        "id"   : String
      }
})

const ModelClass = mongoose.model('user_data', user);

module.exports = ModelClass;
