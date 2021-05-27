const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Job = require('../models/Jobs')


// router.get('/', ensureAuthenticated, (req, res) => {res.render('controlsEmp')});

// ############################## Employer Control Routes ##############################################


// Job Register Page
router.post('/post', ensureAuthenticated, async (req, res) => {

  // console.log(req.body);
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
    // res.status(201).json(newJob)
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


// Selecting One Application
router.post('/post/select', ensureAuthenticated , async (req, res) => {

    const idJob = req.body.itemIdSelect
    const idApplicant = req.body.userIdSelect

    const filter = {_id : idJob}
    const update = {applicant : idApplicant}

    // pushing the name of candidate into selected candidated
    let updatedEntrySelected = await Job.findOneAndUpdate(filter,{$addToSet: {selected : idApplicant}}, { new: true}, function(err, updatedEntrySelected){
    if(err){
        console.log("Something wrong when updating data!");
    }
    // console.log(updatedEntrySelected);

    });

    // pulling the name of candidate from the applicants
    let updatedEntryApplicantRemoved = await Job.findOneAndUpdate(filter,{$pull: {applicant : idApplicant}}, { new: true}, function(err, updatedEntryApplicantRemoved){
    if(err){
        console.log("Something wrong when updating data!");
    }
    // console.log(updatedEntryApplicantRemoved);
    res.redirect("/dashboard");
    });
})


// Rejecting One Application
router.post('/post/reject', ensureAuthenticated , async (req, res) => {

    const idJob = req.body.itemIdReject
    const idApplicant = req.body.userIdReject

    const filter = {_id : idJob}
    const update = {applicant : idApplicant}

    // pulling the name of candidate from the applicants
    let updatedEntryApplicantRemoved = await Job.findOneAndUpdate(filter,{$pull: {applicant : idApplicant}}, { new: true}, function(err, updatedEntryApplicantRemoved){
    if(err){
        console.log("Something wrong when updating data!");
    }
    // console.log(updatedEntryApplicantRemoved);
    res.redirect("/dashboard");
    });
})

// Closing One Application
router.post('/post/close', ensureAuthenticated , async (req, res) => {

    const idJob = req.body.itemIdClose

    const filter = {_id : idJob}

    // pulling the name of candidate from the applicants
    let updatedEntry = await Job.findOneAndUpdate(filter, {status : true}, { new: true}, function(err, updatedEntry){
    if(err){
        console.log("Something wrong when updating data!");
    }
    // console.log(updatedEntry);
    res.redirect("/dashboard");
    });
})



// ############################## Candidate Control Routes ##############################################


// Updating One Application - Applying to the Job
router.post('/application', ensureAuthenticated , async (req, res) => {

    const idJob = req.body.itemIdApp
    const idApplicant = req.body.userIdApp

    const filter = {_id : idJob}

    let updatedEntry = await Job.findOneAndUpdate(filter,{$addToSet: {applicant : idApplicant}}, { new: true}, function(err, updatedEntry){
    if(err){
        console.log("Something wrong when updating data!");
    }
    // console.log(updatedEntry);
    res.redirect("/dashboard");
    });
})


// Deleting One Application - Removing the Job applied
router.post('/application/delete', ensureAuthenticated, async (req, res) => {

    const idJob = req.body.itemIdAppDel
    const idApplicant = req.body.userIdAppDel

    const filter = {_id : idJob}
    // const update = {applicant : undefined}

    let updatedEntry = await Job.findOneAndUpdate(filter, {$pull: {applicant : idApplicant}}, { new: true}, function(err, updatedEntry){
    if(err){
        console.log("Something wrong when updating data!");
    }
    // console.log(updatedEntry);
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