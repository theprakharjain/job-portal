const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Register Page
router.get('/', forwardAuthenticated, (req, res) => res.render('signuppage'));

module.exports = router;