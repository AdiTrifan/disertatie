var express = require('express');
var router = express.Router();
var io = require('socket.io').listen(5000);
var gpio_controller = require('./gpio_controller.js');



var moment = 
router.get('/', function(req, res, next) {
    res.render('gyroscope_controller', {
        title: 'Gyroscope Controller'
    });
});

io.sockets.on('connection', function(socket) {
    socket.on('moving', function(data) {
        gpio_controller.gyro_moving(data);
    });
    socket.on('disconnect', function() {
        gpio_controller.user_left();
    });
});



module.exports = router;
