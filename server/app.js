global.PUBLIC = __dirname+'/public/'

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');




let db = require('./routes/list');
let index = require('./routes/index');
let renew = require('./routes/renew')
let login = require('./routes/account/login')
let register = require('./routes/account/register')
let updateAccount = require('./routes/account/update')
let accountList = require('./routes/account/accountList')


//let meet_db = require('./routes/meet/db')
let test = require('./routes/test') 


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Access-Control-Allow-Origin
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);
    else  next();
});

//routes
app.use('/', index);
app.use('/db',db);
app.use('/test',test)
app.use('/renew',renew)
app.use('/login',login)
app.use('/register',register)
app.use('/accountList',accountList)
app.use('/updateAccount',updateAccount)
//app.use('/meet/db',meet_db);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
