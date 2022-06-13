const express = require('express')
const ejs = require('ejs')
const app = express()
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')

require('dotenv').config()

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(morgan())

app.use(expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

// DB Connection
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
    console.log(err.message, err.name);
    process.exit(1);
});
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
})
if(!mongoose){
    console.log('No DB connection')
} else {
    console.log('DB connection')
}

// Middlewares
const validatePosts = require('./middlewares/authMiddleWare');
const authMiddleWare = require('./middlewares/authMiddleWare');
const redirectIfAuthenticated = require('./middlewares/redirectIfAuthenticated');

app.use('/posts/store', validatePosts)

// Static Pages
const homeController = require('./controllers/home')
const aboutController = require('./controllers/about')
const privacyPolicyController = require('./controllers/privacy')
const termsController = require('./controllers/terms')
const resourcesController = require('./controllers/resources')
//////////////////////////////////////////////////////
// Users
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutUserController = require('./controllers/logout');
const profileController = require('./controllers/profile');
const singleProfileController = require('./controllers/singleProfile')
////////////////////////////////////////////////////////////////
// Post pages
const postsController = require('./controllers/posts')
const newPostController = require('./controllers/newPost')
const singlePostController = require('./controllers/singlePost')
const storePostController = require('./controllers/storePost')
////////////////////////////////////////////////////////////////
// Course pages
const coursesController = require('./controllers/AslCourses');
const newCourseController = require('./controllers/newCourse')
const singleCourseController = require('./controllers/singleCourse')
const storeCourseController = require('./controllers/storeCourse')
/////////////////////////////////////////////////////////////////
// Terps
const newTerpsController = require('./controllers/newTerp')
const storeTerpController = require('./controllers/storeTerp')
const terpsController = require('./controllers/terps')
/////////////////////////////////////////////////////////////////
const newReviewController = require('./controllers/newReview');
const storeReviewController = require('./controllers/storeReview')

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening')
})

app.get('/', homeController)
app.get('/about', aboutController)
app.get('/privacy', privacyPolicyController)
app.get('/resources', resourcesController)

////////////////////////////////////////////////////////
// Users
app.get('/auth/register', redirectIfAuthenticated, newUserController);
app.post('/users/register', redirectIfAuthenticated, storeUserController);
app.get('/auth/login', redirectIfAuthenticated, loginController)
app.post('/users/login', redirectIfAuthenticated, loginUserController)
app.get('/auth/logout', logoutUserController)
app.get('/profile', authMiddleWare, profileController)
app.get('/singleProfile/:id', singleProfileController)

///////////////////////////////////////////////////////
// Posts
app.get('/courses', coursesController)
app.get('/course/:id', singleCourseController)
app.get('/createCourse', newCourseController)
app.post('/course/store', storeCourseController)

///////////////////////////////////////////////////////
// Posts
app.get('/createPost', newPostController)
app.get('/posts', postsController)
app.get('/post/:id', authMiddleWare, singlePostController)
app.get('/createPost', newPostController)
app.post('/post/store', storePostController)

////////////////////////////////////////////////////////
// Terps
app.get('/createTerp', authMiddleWare, newTerpsController)
app.post('/terps/store', authMiddleWare, storeTerpController)
app.get('/terps', terpsController)

////////////////////////////////////////////////////////
app.get('/createReview', newReviewController);
app.post('/review/store', storeReviewController)

///////////////////////////////////////////////////////
// Terms
app.get('/terms', termsController)
