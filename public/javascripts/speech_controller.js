var socket = io.connect(':7100');
$(document).ready(function() {
    var move = {
        "data": '',
        "val": ''
    };

    function send(move) {
        socket.emit('moving', {
            move: move
        });
        return false;
    }
    $('#stop').bind('touchstart', function() {
        $(this).css({
            'background-color': 'red'
        });
        move.data = "true";
        move.val = "stop";
        send(move);
    });
    $('#stop').bind('touchend', function() {
        $(this).css({
            'background-color': '#F1F1F1'
        });
    });
    var text = document.getElementById('text');
    var speech = new Speech({
        debugging: true,
        continuous: true,
        interimResults: true,
        autoRestart: true
    });
    speech.on('start', function() {
        text.innerHTML = 'Please, say your command';
    }).on('end', function() {
        text.innerHTML = 'Stopped listening.';
    }).on('interimResult', function(msg) {
        text.innerHTML = msg;
    }).on('finalResult', function(msg) {
        text.innerHTML = msg;
        move.val = msg;
        move.data = "true";
        send(move);
    }).start();
});
