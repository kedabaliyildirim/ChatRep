const express         = require('express');
const path            = require('path');
const logger          = require('morgan');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');
const session         = require('express-session')
const passport        = require('passport');

//dotenv
const dotenv          = require('dotenv');
dotenv.config();

//Database
const db              = require('./helpers/db')();

// //Redis
// const redis           = require('redis')
// const redisStore      = require('connect-redis')(session)
// const redisClient     = require('./helpers/redisStore');

//routes
const index           = require('./routes/index');
const auth            = require('./routes/auth');
const chat            = require('./routes/chat');
const messages        = require('./routes/messages');

const app = express();


//middlewares
const isAuthenticated = require('./middleware/isAuthenticated');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

//EXPRESS-SESSION
app.use(session({
 // store: new redisStore({client:redisClient}),
  secret:process.env.SESSION_SECRET_KEY,
  resave:false,
  saveUninitialized:true,
  cookie:{ maxAge: 14*24*3600000}
}));


//PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use('/', index);
app.use('/auth', auth);
app.use('/chat', isAuthenticated, chat);
app.use('/messages', isAuthenticated, messages);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
