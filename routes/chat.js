const express = require('express');
const { render } = require('../app');
const router = express.Router();

/* GET CHAT */
router.get('/',(req, res, next)=> {
  console.log(req.user);
  res.render('chat', {user : req.user});
})
module.exports = router;
