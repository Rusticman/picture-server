const AddPicture = require('./controllers/add_picture_controller'); //adds picture to DB
const AddUserDetails = require('./controllers/user_details_controller'); //adds user info
const Login = require('./controllers/login_controller');
const UsersPictures = require('./controllers/users_pictures_controller');
const AllPictures = require('./controllers/all_pictures_controller');
const DeletePicture = require('./controllers/delete_picture_controller');
const AddUserImage = require('./controllers/add_user_image_controller');
const VoteImage = require('./controllers/vote_controller');
const BrokenImage = require('./controllers/broken_image_controller');
const config = require('./config');
const jwt = require('jwt-simple');


const passportService = require('./services/passport');//necessary for passport to work
const passport = require('passport');

//this allows passport strategies to be used for authenticating user for protected routes (middleware)
const requireAuth = passport.authenticate('jwt',{session:false});

module.exports = function(app){

app.post('/add/picture', AddPicture);
app.post('/add/user/details', AddUserDetails);
app.post('/login', Login);
app.post('/add/user/image', AddUserImage);
app.post('/vote/image', VoteImage);
app.post('/broken/image', BrokenImage);
app.get('/all/pictures', AllPictures);
app.get('/users/pictures/:id', UsersPictures);
app.delete('/delete/picture/:imageID', DeletePicture);

}
