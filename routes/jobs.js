const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Job = mongoose.model('Jobs');

// Getting all
router.get('/', ensureAuthenticated, async (req, res) => {

  try {
    const Jobs = await Job.find()
    res.json(Jobs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }

})

// Getting One
router.get('/:id', ensureAuthenticated, getJob, (req, res) => {
  res.json(res.job)
})

// Creating one
router.post('/', ensureAuthenticated, async (req, res) => {
  const job = new Job({
    companyName: req.body.companyName,
    jobRole: req.body.jobRole,
    skills: req.body.skills,
    jobType: req.body.jobType,
    experience: req.body.experience,
    datePosted: req.body.datePosted,
    selected: req.body.selected,
    status: req.body.status
  })
  try {
    const newJob = await job.save()
    res.status(201).json(newJob)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', ensureAuthenticated, getJob, async (req, res) => {
  if (req.body.companyName != null) {
    res.job.companyName = req.body.companyName
  }
  if (req.body.jobRole != null) {
    res.job.jobRole = req.body.jobRole
  }
  if (req.body.skills != null) {
    res.job.skills = req.body.skills
  }
  if (req.body.jobType != null) {
    res.job.jobType = req.body.jobType
  }
  if (req.body.experience != null) {
    res.job.experience = req.body.experience
  }
  if (req.body.datePosted != null) {
    res.job.datePosted = req.body.datePosted
  }
  if (req.body.selected != null) {
    res.job.selected = req.body.selected
  }
  if (req.body.status != null) {
    res.job.status = req.body.status
  }
  try {
    const updatedJob = await res.job.save()
    res.json(updatedJob)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', ensureAuthenticated, getJob, async (req, res) => {
  try {
    await res.job.remove()
    res.json({ message: 'Deleted Job' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getJob(req, res, next) {
  let job
  try {
    job = await Job.findById(req.params.id)
    if (job == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.job = job
  next()
}


module.exports = router


// POST http://localhost:3000/jobs
// Content-Type: application/json

// {
//     "companyName": "Reliance",
//     "jobRole": "Chief Technical Officer",
//     "skills": "Python, Java",
//     "jobType": "Permanent",
//     "experience": "0-2 Years",
//     "datePosted": "12/06/2021",
//     "selected": false

// }