(function() {
    var backendKeyboard = {
        socket: io.connect(':4000'),
        sendMoveToBackend: function(move) {
            this.socket.emit('moving', { move: move });
        }
    };
    var keyboardController = {
        move: {
            data: "",
            val: "",
        },
        init: function() {
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function() {
            this.$up = $('#up');
            this.$down = $('#down');
            this.$left = $('#left');
            this.$right = $('#right');
            this.$stop = $('#stop');
        },
        bindEvents: function() {
            this.$up.bind('touchstart', function() {
                keyboardController.touchStart($(this));
            });
            this.$up.bind('touchend', function() {
                keyboardController.touchEnd($(this));
            });
            this.$down.bind('touchstart', function() {
                keyboardController.touchStart($(this));
            });
            this.$down.bind('touchend', function() {
                keyboardController.touchEnd($(this));
            });
            this.$left.bind('touchstart', function() {
                keyboardController.touchStart($(this));
            });
            this.$left.bind('touchend', function() {
                keyboardController.touchEnd($(this));
            });
            this.$right.bind('touchstart', function() {
                keyboardController.touchStart($(this));
            });
            this.$right.bind('touchend', function() {
                keyboardController.touchEnd($(this));
            });
            this.$stop.bind('touchstart', function() {
                keyboardController.touchStart($(this));
            });
            this.$stop.bind('touchend', function() {
                keyboardController.touchEnd($(this));
            });
        },
        render: function(type, selector) {
            if (type === "start") {
                if (selector[0].id === "stop") {
                    selector.css({ 'background-color': '#840606' });
                } else {
                    selector.css({ 'background-color': '#1AFF00' });
                }
            } else {
                selector.css({ 'background-color': '#F1F1F1' });
            }
        },
        startPeristentVibrate: function(level) {
            navigator.vibrate(level);
        },
        stopVibrate: function() {
            navigator.vibrate(0);
            navigator.vibrate([]);
        },
        touchStart: function(selector) {
            this.startPeristentVibrate(5000);
            this.render("start", selector);
            this.move.data = "true";
            this.move.val = selector[0].id;
            backendKeyboard.sendMoveToBackend(this.move);
        },
        touchEnd: function(selector) {
            this.stopVibrate();
            this.render("end", selector);
            this.move.data = "false";
            this.move.val = selector[0].id;
            backendKeyboard.sendMoveToBackend(this.move);
        }
    };
    keyboardController.init();
})();
