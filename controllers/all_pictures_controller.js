const PictureData = require('../models/picture_data');

module.exports = (req,res,next) => {

  PictureData.find({}, (err, allPictures) => {
    if(err){
      console.error('there was an error finding the images');
      throw err;
    }
    return res.send({success:true,allPictures:allPictures})
  })
}
