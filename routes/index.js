const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Job = require('../models/Jobs')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// function fetchdata() {
//   fetch('http://localhost:3000/jobs')
//     .then(res => {
//       return res.json()
//     }).then(data => {
//       console.log(data[0].companyName)
//     }).catch(error =>{
//       console.log(error)
//     });
// }

// .then(body => console.log(body));
// fetchdata();


// Welcome Page
router.get('/', forwardAuthenticated, async (req, res) => {

  try {
    const Jobs = await Job.find()
    res.render('welcome', { newJobItems: Jobs })
    // res.json(Jobs)
    
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  
});

// Dashboard

router.get('/dashboard', ensureAuthenticated, async (req, res) => {

  try {
    const Jobs = await Job.find()
    res.render('dashboard', { newJobItems: Jobs, user: req.user })
    // res.json(Jobs)
    
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  
});

// router.get('/dashboard', ensureAuthenticated, (req, res) =>
// res.render('dashboard', {
// user: req.user
//  })
// );  
    
  


module.exports = router;
