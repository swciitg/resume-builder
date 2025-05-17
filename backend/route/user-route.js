const express = require('express');
const router = express.Router({mergeParams: true});
const UC = require('../controller/user-controller.js');

router.get('/', UC.getUserInfo);
router.put('/', UC.saveProgress);

module.exports = router;