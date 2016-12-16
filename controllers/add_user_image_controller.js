const User = require('../models/user_data');
const PictureData = require('../models/picture_data');

module.exports = (req, res, next) => {

const userImg = req.body.userImg;
const id =req.body.id;

  User.findById(id, (err, user) => {
    if(err){
      console.error('there was an error finding the user');
      throw err;
    }
    user.userImage = userImg;

    user.save(err => {
      if(err){
        console.error('there was an error trying to save user details.');
        throw err;
      }

      PictureData.update({userID:id},{$set: {userImage:userImg}}, {multi:true}, (err, number) => {
        if(err){
          console.error('there was an error updating the pictures');
          throw err;
        }

        PictureData.find({}, (err, allPictures) => {
          if(err){
            console.error('there was an error retrieving all these pictures');
            throw err;
          }
          return res.send({data:allPictures});
        })

      })
    })
  })
}
