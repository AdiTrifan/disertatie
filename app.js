/// <reference path="typings/node/node.d.ts"/>
var express = require('express');
/*===================================
=            new require            =
===================================*/
var flash = require('connect-flash');
/*-----  End of new require  ------*/
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var routes = require('./routes/index');
var users = require('./routes/users');

/*==================================
=            New Routes            =
==================================*/
var keyboard_controller = require('./routes/keyboard_controller');
var gyroscope_controller = require('./routes/gyroscope_controller');
var speech_controller = require('./routes/speech_controller');
var settings = require('./routes/settings');
var graphs = require('./routes/graphs');
/*-----  End of New Routes  ------*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
/*==================================
=            New Routes            =
==================================*/
app.use('/keyboard_controller', keyboard_controller);
app.use('/gyroscope_controller', gyroscope_controller);
app.use('/speech_controller',speech_controller);
app.use('/settings',settings);
app.use('/graphs',graphs);
/*-----  End of New Routes  ------*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

