// var sleep = require('sleep');
// var Gpio = require('onoff').Gpio;
// var trigger = new Gpio(26, 'out');
// var echo = new Gpio(19, 'in');

// var pulse_start,
// 	pulse_end,
// 	pulse_duration,
// 	distance;
	
// exports.dist = function () {
// 	trigger.writeSync(0);

// 	sleep.usleep(100000);

// 	trigger.writeSync(1);

// 	sleep.usleep(1000);

// 	trigger.writeSync(0);

// 	while (echo.readSync() == 0) {
// 		pulse_start = Date.now() / 1000;
// 	}

// 	while (echo.readSync() == 1) {
// 		pulse_end = Date.now() / 1000;
// 	}


// 	pulse_duration = pulse_end - pulse_start;

// 	distance = pulse_duration * 17150;

// 	distance = Math.round(distance);
// 	console.log(distance);
// };
