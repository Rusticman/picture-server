const PictureData = require('../models/picture_data');

module.exports = (req, res, next) => {

  const pictureID = req.body.pictureID;

  PictureData.findById(pictureID, (err, picture) => {
    if(err){
      console.error('there was an error retrieving all picture data');
      throw err;
    }

    picture.broken = true;

    picture.save(err => {
      if(err){
        console.error('there was an error saving the new data');
        throw err;
      }
      PictureData.find({}, (err, allPictures) => {
        if(err){
          console.error('there was an error retrieving all picture data');
          throw err;
        }
        return res.send({success:true, data:allPictures});
      })
    })

  })
}
