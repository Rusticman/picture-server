const User = require('../models/user_data');

module.exports = (req, res, next) => {

  const id = req.body.id;
  const image = req.body.image;
  const name = req.body.name;

  User.findById(id, (err, user) => {
    if(err){
      console.error('there was an error finding the user');
      throw err;
    }

    user.userName = name;
    user.userImage = image;

    user.save(err => {
      if(err){
        console.error('There was an error saving user information');
        throw err;
      }
      return res.send({success:true, userData:user});
    })
  })
}
