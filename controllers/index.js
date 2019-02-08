const express = require('express');
const router = express.Router();
const path = require('path');
const settings = require('../settings');

router.get('/',function(req, res, next){
  res.sendFile(path.join(settings.PROJECT_DIR + '/views/index.html'));
});

module.exports = router;