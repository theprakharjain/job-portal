require('dotenv').config()

const express = require ("express")
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express()

// Passport Config
require('./config/passport')(passport);

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// Lets the server accept json as a parameter
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Static files
app.use(express.static("public"));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// EJS
app.use(expressLayouts);
app.set('layout', './layouts/layout')
app.set('view engine', 'ejs');

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Route to jobs API
const jobsRouter = require('./routes/jobs')
app.use('/jobs', jobsRouter) //localhost:3000/jobs

// Route to homepage
const homeRouter = require('./routes/index')
app.use('/', homeRouter) //localhost:3000/

// Route to user
const userRouter = require('./routes/users')
app.use('/users', userRouter) //localhost:3000/users

// Route to signup
const signupRouter = require('./routes/signup')
app.use('/signup', signupRouter) //localhost:3000/signup

// Route to candidate controls
const candidateRouter = require('./routes/candidateControls')
app.use('/candidate', candidateRouter) //localhost:3000/candidate

// Route to employer controls
const employerRouter = require('./routes/employerControls')
app.use('/employer', employerRouter) //localhost:3000/employer


app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))