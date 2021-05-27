const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Job = require('../models/Jobs');
const User = require('../models/User');
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

    const jobAppliedCandidate = await Job.find({applicant: {$all : [req.user._id]}});
    const jobRejectedCandidate = await Job.find({rejected: {$all : [req.user._id]}});
    const jobNotAppliedCandidate = await Job.find({applicant: {$nin : [req.user._id]}});
    const jobSelectedCandidate = await Job.find({selected: {$all : [req.user._id]}});
    const jobCreatedEmployer = await Job.find({creator: {$all : [req.user._id]}});

    const Users = await User.find()
    const Jobs = await Job.find()
    res.render('dashboard', { 
      newJobItems: Jobs, 
      user: req.user, 
      usersList: Users,
      jobAppliedCandidateList: jobAppliedCandidate,
      jobNotAppliedCandidateList: jobNotAppliedCandidate,
      jobRejectedCandidateList: jobRejectedCandidate,
      jobSelectedCandidateList: jobSelectedCandidate,
      jobCreatedEmployerList: jobCreatedEmployer      
    })
    // res.json(jobCreatedEmployer)
    
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
