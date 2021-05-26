const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
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

    const id = req.body.itemId
    Job.findByIdAndRemove(id, (err) => {
        if (err) {
      console.log(err);
    } else {
      console.log("Item deleted succesfully");
    }
    });
    res.redirect("/dashboard");

})



// ############################## Candidate Control Routes ##############################################


// Updating One Application
router.post('/application', ensureAuthenticated , async (req, res) => {

    const idJob = req.body.itemIdApp
    const idApplicant = req.body.userIdApp

    const filter = {_id : idJob}
    const update = {applicant : idApplicant}

    let updatedEntry = await Job.findOneAndUpdate(filter, update, { new: true}, function(err, updatedEntry){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(updatedEntry);
    res.redirect("/dashboard");
    });
})


// Deleting One Application
router.post('/application/delete', ensureAuthenticated, async (req, res) => {

    const idJob = req.body.itemIdAppDel
    const idApplicant = req.body.userIdAppDel

    const filter = {_id : idJob}
    const update = {applicant : undefined}

    let updatedEntry = await Job.findOneAndUpdate(filter, update, { new: true}, function(err, updatedEntry){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(updatedEntry);
    res.redirect("/dashboard");
    });

//     const id = req.body.itemId
//     Job.findByIdAndRemove(id, (err) => {
//         if (err) {
//       console.log(err);
//     } else {
//       console.log("Item deleted succesfully");
//     }
//     });
//     res.redirect("/dashboard");

})



module.exports = router;