const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// Register a new user
router.post('/register', authService.registerUser);

// Authenticate a user and return a token
router.post('/login', authService.loginUser);

// Get the current user's profile (requires token)
router.get('/me', authService.authenticateToken, authService.getCurrentUser);

module.exports = router;