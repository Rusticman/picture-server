const PictureData = require('../models/picture_data');
const User = require('../models/user_data');

module.exports = function(req,res,next){

  const image = req.body.image;
  const id = req.body.id;
  const imageName = req.body.imageName;

  User.findById(id, (err, user) => {
    if(err){
      console.error('there was an error retrieving all the images');
      throw err;
    }


    const pictureData = new PictureData({
      imageURL:image,
      userID:id,
      userImage:user.userImage,
      likes:0,
      imageName:imageName,
      colour:user.colour,
      broken:false
    })

    pictureData.save(err => {
      if(err){
        console.error('there was an error saving the picture data');
        throw err;
      }

      PictureData.find({}, (err, allImages) => {
        if(err){
          console.error('there was an error finding the images');
          throw err;
        }
        return res.send({success:true, data:allImages})
      })
    })


  })



  }
