const express = require('express');
const { render } = require('../app');
const router = express.Router();

/* GET CHAT */
router.get('/',(req, res, next)=> {
  res.render('chat');
})
module.exports = router;
