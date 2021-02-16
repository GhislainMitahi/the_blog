var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const flash = require('message-flash');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Article = require('./models/article.model');
const Category = require('./models/category.model');

var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');

var app = express();


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog', 
  {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>console.log("Connexion à MongoDB réussie"))
  .catch(()=> console.log("Echec de connexion à mongoDB"));

for (let index = 0; index < 8; index++) {
  article = new Article({
    title: 'Qu\'est-ce que le Lorem Ipsum?',
    content: 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n\'a pas fait que survivre cinq siècles, mais s\'est aussi adapté à la bureautique informatique, sans que son contenu n\'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.',
    publishedAt: Date.now()
  })
  //article.save();
  
}

for (let index = 0; index < 8; index++) {
  category = new Category({
    title: 'Category '+index,
    description: 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n\'a pas fait que survivre cinq siècles, mais s\'est aussi adapté à la bureautique informatique, sans que son contenu n\'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.'
  })
  //category.save();
  
}

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
