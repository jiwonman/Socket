const express = require('express');
const router = express.Router();
const authCtrl = require('../controller/authCtrl');

/* GET home page. */
router.post('/login', authCtrl.login);

router.get('/signup', authCtrl.signUpPage);

router.post('/signup', authCtrl.signUp);

module.exports = router;
