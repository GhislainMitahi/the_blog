var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const flash = require('message-flash');
// var flash = require('connect-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');
const mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost:27017/blog',
  {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>console.log("Connexion à MongoDB réussie"))
  .catch(()=> console.log("Echec de connexion à mongoDB"));

app.use(session({
  secret: 'This is very secret',
  resave: false,
  saveUninitialized: true
}))

app.use(flash);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
