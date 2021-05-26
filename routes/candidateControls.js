const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Register Page
router.get('/', ensureAuthenticated, (req, res) => {res.render('controlsCan')});

module.exports = router;