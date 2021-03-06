var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');


var bodyParser = require('body-parser');
//加载session支持会话处理
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


var settings = require('./config').dbInfo;

//加载路由模块
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
//指定视图路径以及渲染引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//session功能
app.use(session({
      resave: false,
        saveUninitialized: false,
      secret: settings.COOKIE_SECRET,
      store: new MongoStore({   //创建新的mongodb数据库
        url: settings.url,
        collection: 'sessions',
        saveUninitialized: true
      })
    })
);

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  console.log('Session is = ', req.session.user);
  next();
});


//指定静态资源加载路径
app.use(express.static(path.join(__dirname, 'public')));

//会话机制
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //var err = new Error('Not Found');
  //err.status = 404;
  //next(err);
  res.render("404");

});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
