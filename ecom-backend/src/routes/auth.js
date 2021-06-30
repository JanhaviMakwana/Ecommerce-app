const authController = require('../controllers/auth');
const express = require('express');
const router = express.Router();

router.post('/login', authController.login);
router.post('/signup',authController.signup);

module.exports = router;