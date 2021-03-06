const UserData = require('../models/user_data');
const jwt = require('jwt-simple');
const config = require('../config');


function tokenForUser(user){
  const timestamp = new Date().getTime();

  return jwt.encode({sub:user.id,iat:timestamp},config.secret);//user.id is a proxy for user._id which is generated by mongo
  //secret is combined with sub & iat to create token
}


module.exports = function(req,res,next){

  const userID = req.body.userID;//userID provided by auth0
  const name = req.body.name;
  const provider = req.body.provider;

  const query = provider +'.id';


UserData.findOne({[query]:userID},function(err,existingUser){//find with the query using fb or twitter id provided by auth0
  if(err){
    console.error('error trying to find user in DB.')
    throw err;
  }

  if(existingUser){
     return res.send({token:tokenForUser(existingUser),success:true ,id:existingUser._id, voted:existingUser.voted});
     //if exists, give token back and id
  }

UserData.findOne({"userName":name},function(err,existingUser){
  //if cannot with provided id, use user name
  if(err){
    console.error('error trying to find user in DB.')
    throw err;
  }
if(existingUser){
  //if find with username, save the new id in user and send back token
  existingUser[provider].id = userID;
  existingUser.save();

  return res.send({token:tokenForUser(existingUser),success:true,id:existingUser._id, voted:existingUser.voted})
}

function pickColour(){


   const r = (Math.round(Math.random()* 127) + 127).toString(16);
   const g = (Math.round(Math.random()* 127) + 127).toString(16);
   const b = (Math.round(Math.random()* 127) + 127).toString(16);
   return '#' + r + g + b;
}



const userData = new UserData({
  //if no name or provider id exists, create new user
  userName:name,
  voted:[],
  [query]:userID,
  userImage:null,//random colour
  colour:pickColour()
});//the query saves the user's unique twitter of fb ID

userData.save(function(err){
  if(err){
    console.error('error trying to save user in DB.')
  throw err;
  }
  return res.send({token:tokenForUser(userData),success:true, id:userData._id, voted:userData.voted})
  })
})
})
}
