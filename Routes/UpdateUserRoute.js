// routes/userRoutes.js
const express = require('express');
const { updateUserDetails } = require('../Controllers/UserUpdateController');
const ensureAuthenticated = require('../Middlewares/Auth')
const { updateUserValidation } = require('../Middlewares/validationMiddleware');

const router = express.Router();

// PUT route for updating user details
router.put('/update', ensureAuthenticated, updateUserValidation, updateUserDetails);

module.exports = router;
