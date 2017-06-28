try {
    var Gpio = require('onoff').Gpio;
    var GpioVersion = require('onoff/package.json').version;
} catch (er) {
    Gpio = null;
}

if (Gpio) {
    wra = new Gpio(17, 'out');
    wrb = new Gpio(27, 'out');
    wla = new Gpio(22, 'out');
    wlb = new Gpio(23, 'out');
}

function write(ra, rb, la, lb) {
    if (Gpio) {
        wra.write(ra);
        wrb.write(rb);
        wla.write(la);
        wlb.write(lb);
    }
}

function up() {
    console.log("up");
    write(0, 1, 1, 0);
}

function down() {
    console.log("down");
    write(1, 0, 0, 1);
}

function right() {
    console.log("right");
    write(1, 0, 1, 0);
}

function left() {
    console.log("left");
    write(0, 1, 0, 1);
}

function stop() {
    console.log("stop");
    write(0, 0, 0, 0);
}

exports.user_left = function() {
    stop();
};
exports.moving = function(move) {
    switch (move.move.val) {
        case "up":
            if (move.move.data === "true") {
                up();
            } else {
                stop();
            }
            break;
        case "down":
            if (move.move.data === "true") {
                down();
            } else {
                stop();
            }
            break;
        case "left":
            if (move.move.data === "true") {
                left();
            } else {
                stop();
            }
            break;
        case "right":
            if (move.move.data === "true") {
                right();
            } else {
                stop();
            }
            break;
        case "stop":
            stop();
            break;
    }
};
exports.gyro_moving = function(move) {
    if (move.move.y < -3) {
        up();
    }
    if (move.move.y > 3) {
        down();
    }
    if (move.move.x < -3) {
        right();
    }
    if (move.move.x > 3) {
        left();
    }
    if (move.move.x < 3 && move.move.x > -3 && move.move.y < 3 && move.move.y > -3) {
        stop();
    }
};
