const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

// router.use((req, res, next) => {
//     console.log('middleware');
//     let statusCode = userController.refresh(req, res);
//     res.myStatusCode = statusCode;
//     next();
// })

// router.get('/logout', userController.logoutUser);

// router.get('/issigned', 'wolcome');
module.exports = router;