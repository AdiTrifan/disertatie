$.get("/carinfo", function(car) {
    levels(car.sensordata.levels);
    temperatures(car.sensordata.temperatures);
});


 $(window).load(function(){        
   $('#myModal').modal('show');
    }); 


function levels_style(selector, percentage) {
    $('#' + selector).css("width", percentage + "%");
    if (percentage <= 29 && percentage >= 0) {
        $('#notification').css({ 'display': 'block' });
        navigator.vibrate(1000);
        $('#notification p').append('<strong>' + selector.toString() + '</strong>\n=\n' + percentage.toString() + '%<br>');
        return;
    }
    if (percentage >= 30 && percentage <= 45) {
        $('#' + selector).removeClass("progress-bar-danger").addClass("progress-bar-warning");
        return;
    }
    if (percentage >= 46 && percentage <= 79) {
        $('#' + selector).removeClass("progress-bar-danger").removeClass("progress-bar-warning");
        return;
    }
    if (percentage >= 80) {
        $('#' + selector).removeClass("progress-bar-danger").addClass("progress-bar-success");
        return;
    }
}

function temperatures_style(selector, percentage) {
    $('#' + selector).circleProgress({
        value: "." + percentage,
        fill: {
            gradient: [
                ['#ff1e41', 0.5],
                ['#ff5f43', 0.5]
            ],
            gradientAngle: Math.PI / 4
        }
    }).on('circle-animation-progress', function(event, progress, stepValue) {
        $(this).find('strong').text(String(stepValue.toFixed(2)).substr(1));
    });
    if (percentage > 30 && percentage < 49) {
        $('#' + selector).circleProgress({
            value: "." + percentage,
            fill: {
                gradient: [
                    ['#FFFF00', 0.5],
                    ['#FF9900', 0.5]
                ],
                gradientAngle: Math.PI / 4
            }
        }).on('circle-animation-progress', function(event, progress, stepValue) {
            $(this).find('strong').text(String(stepValue.toFixed(2)).substr(1));
        });
    }
    if (percentage > 50 && percentage < 79) {
        $('#' + selector).circleProgress({
            value: "." + percentage,
            fill: {
                gradient: [
                    ['#0681c4', 0.5],
                    ['#4ac5f8', 0.5]
                ],
                gradientAngle: Math.PI / 4
            }
        }).on('circle-animation-progress', function(event, progress, stepValue) {
            $(this).find('strong').text(String(stepValue.toFixed(2)).substr(1));
        });
    }
    if (percentage > 80) {
        $('#' + selector).circleProgress({
            value: "." + percentage,
            fill: {
                gradient: [
                    ['#006600', 0.5],
                    ['#33CC33', 0.5]
                ],
                gradientAngle: Math.PI / 4
            }
        }).on('circle-animation-progress', function(event, progress, stepValue) {
            $(this).find('strong').text(String(stepValue.toFixed(2)).substr(1));
        });
    }
}

function temperatures(temperatures) {
    temperatures_style('engine', temperatures.engine);
    temperatures_style('outside', temperatures.outside);
}

function levels(levels) {
    levels_style('baterry', levels.battery);
    levels_style('oil', levels.oil);
    levels_style('windshield', levels.windshield_washer_fluid);
    levels_style('pressure', levels.tires_pressure);
}


