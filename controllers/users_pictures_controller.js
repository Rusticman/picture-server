const PictureData = require('../models/picture_data');

module.exports = (req,res,next) => {
  const id = req.params.id;

  PictureData.find({"userID":id}, (err, usersImages) => {
    if(err){
      console.error('there was an error finding userImages');
      throw err;
    }
    return res.send({success:true, usersImages})
  })
}
