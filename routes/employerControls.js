const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Job = require('../models/Jobs')


// router.get('/', ensureAuthenticated, (req, res) => {res.render('controlsEmp')});

// ############################## Employer Control Routes ##############################################


// Job Register Page
router.post('/post', ensureAuthenticated, async (req, res) => {
    console.log(req.body);
  const job = new Job({
    companyName: req.body.companyName,
    jobRole: req.body.jobRole,
    skills: req.body.skills,
    jobType: req.body.jobType,
    experience: req.body.experience,
    datePosted: req.body.datePosted,
    selected: req.body.selected,
    applied: req.body.applied,
    creator: req.body.userId
  })
  try {
    const newJob = await job.save()
    res.redirect('/dashboard')
    res.status(201).json(newJob)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


// Deleting One Job
router.post('/post/delete', ensureAuthenticated, async (req, res) => {
  let job
  console.log(req.body.itemId)
  try {
    job = Job.findById(req.body.itemId)
    console.log(job)
    await res.job.remove()
    res.redirect('/dashboard')
    res.json({ message: 'Deleted Job' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// ############################## Candidate Control Routes ##############################################

module.exports = router;