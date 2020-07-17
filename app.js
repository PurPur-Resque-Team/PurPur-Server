var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();
const models = require("./models/index.js");
const schedule = require("node-schedule");
const sequelize = require('sequelize')
const {Op} = sequelize;
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
models.sequelize.sync().then(() => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
});

const resetMissionClearAndCheckLastClear = schedule.scheduleJob("0 0 0 1/1 * ? *", async function () {
  let expireDate = moment().subtract(3, 'days').add(9, "hours").toDate();
  await models.missions.update({
    isCleared: 0
  })

  console.log('========MISSION RESET COMPLETE!===================');
  console.log();
  let update = await models.animals.update({
    animalStatus: 0,
    animalProgress: 0
  }, {
    where: {
      lastMissionClear: {
        [Op.lte]: expireDate
      }
    }
  })
  console.log(update)
})
module.exports = app;
