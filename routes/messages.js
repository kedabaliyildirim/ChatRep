const express = require('express');
const messages = require('../src/lib/Messages');
const router = express.Router();

//Libs
const Messages = require('../src/lib/Messages')

router.get('/list', (req, res, next) => {
  setTimeout(() => {
    Messages.list(req.query.roomId, messages => {
      res.json(messages)
  
    });
  }, 000);
 
})

module.exports = router;