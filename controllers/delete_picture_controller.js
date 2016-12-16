const PictureData = require('../models/picture_data');

module.exports = function(req,res,next){

  const imageID = req.params.imageID;

  PictureData.remove({_id: imageID}, (err) => {
    if(err){
      console.error('there was an error deleting the image');
      throw err;
    }
    PictureData.find({}, (err, allPictures) => {
      if(err){
        console.error('there was an error finding all the images');
        throw err;
      }
      return res.send({success:true, data:allPictures});
        })
  })
  }
