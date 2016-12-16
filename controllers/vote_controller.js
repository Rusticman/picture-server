const User = require('../models/user_data');
const PictureData = require('../models/picture_data');

module.exports = (req, res, next) => {

const pictureID = req.body.pictureID;
const id = req.body.id;

User.findById(id, (err, user) => {

  if(err){
    console.error('there was an error finding the user');
    throw err;
  }
 var toRemove = false;
  if(user.voted.indexOf(pictureID) !== -1){
    toRemove = true;
    const pictureIDIndex = user.voted.indexOf(pictureID);
    user.voted.splice(pictureIDIndex, 1);
  }
else{
  user.voted.push(pictureID);
  }

  user.save(err => {
    if(err){
      console.error('there was an error saving user details');
      throw err;
    }

    PictureData.findById(pictureID, (err, pictureObj) => {
        if(err){
          console.error('picture like count was not updated');
          throw err;
        }//stu
        if(toRemove){
          pictureObj.likes = pictureObj.likes -= 1;
        }
        else{
          pictureObj.likes = pictureObj.likes += 1;
        }

      pictureObj.save(err => {
        if(err){
          console.error('the new like count was not saved');
          throw err;
        }

        PictureData.find({}, (err, allImages) => {
          if(err){
            console.error('failed to retrieve all data');
            throw err;
          }
          return res.send({allPictures:allImages, voted:user.voted, success:true});
        })
      })
    })

  })
})

}
