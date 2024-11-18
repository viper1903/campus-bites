const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { login, createAdmin, signup } = require('../controllers/authController');

router.post('/login', login);
router.post('/signup', signup);
router.post('/create-admin', createAdmin);

// Add a route to verify token
router.get('/verify', auth, (req, res) => {
    res.json({ 
        isValid: true, 
        user: {
            isAdmin: req.user.isAdmin,
            email: req.user.email
        }
    });
});

module.exports = router; 