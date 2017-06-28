(function() {
    var backendGyroscope = {
        socket: io.connect(':5000'),
        sendMoveToBackend: function() {
            this.socket.emit('moving', { move: gyroscopeController.move });
        }
    };
    var gyroscopeController = {
        move: {
            "x": '1',
            "y": '1',
            "z": '1'
        },
        init: function() {
            window.addEventListener("devicemotion", this.handleMotionEvent, true);
            this.cacheDom();
            this.watchOn();
        },
        cacheDom: function() {
            this.$x = $("#x");
            this.$y = $("#y");
            this.$z = $("#z");
            this.$wheel = $(".wheel");
        },
        watchOn: function() {
            watch(this.move, ["x", "y"], function() {
                gyroscopeController.render();
                backendGyroscope.sendMoveToBackend();
            });
        },
        handleMotionEvent: function(event) {
            gyroscopeController.move.x = Math.round(event.accelerationIncludingGravity.x);
            gyroscopeController.move.y = Math.round(event.accelerationIncludingGravity.y);
            gyroscopeController.move.z = Math.round(event.accelerationIncludingGravity.z);
        },
        render: function() {
            this.$x.text(this.move.x);
            this.$y.text(this.move.y);
            this.$z.text(this.move.z);
            if (this.move.x < -3) {
                this.$wheel.rotate({
                    animateTo: 70
                });
            }
            if (this.move.x > 3) {
                this.$wheel.rotate({ animateTo: -70 });
            }
            if (this.move.x < 3 && this.move.x > -3) {
                this.$wheel.rotate({
                    animateTo: 0
                });
            }
        }
    };
    gyroscopeController.init();
})();