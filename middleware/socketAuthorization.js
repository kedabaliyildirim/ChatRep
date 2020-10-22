const cookieParser =require ('cookie-parser');
const passportsocketio = require('passport.socketio');
const redisStore = require('../helpers/redisStore');
function onAuthorizeSuccess(data, accept){
    console.log('successful connection to socket.io');
    accept(null, true);
  }
  
  function onAuthorizeFail(data, message, error, accept){
    if(error)
      throw new Error(message);
    console.log('failed connection to socket.io:', message);
  
    // We use this callback to log all of our failed connections.
    accept(null, false);
  }
module.exports= passportsocketio.authorize({
    cookieParser,
    key         :'connect.sid',
    secret      :process.env.SESSION_SECRET_KEY,
    store       :redisStore,
    success     :onAuthorizeSuccess,
    fail        :onAuthorizeFail
})