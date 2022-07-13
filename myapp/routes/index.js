const express = require('express');
const router = express.Router();
const indexCtrl = require('../controller/indexCtrl');

/* GET home page. */
router.get('/', indexCtrl.unLogin);

router.get('/main', indexCtrl.Login)

module.exports = router;
