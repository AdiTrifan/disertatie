var nosql = require('nosql').load('./database/db.nosql');
var d = new Date();
var t = Math.round(d.getTime() / (1000 * 60));

function init_car() {
    var car = {
        "timestamp": {
            "minutes_70": t,
            "minutes": d.getMinutes(),
            "day": d.getDate(),
            "month": d.getMonth(),
            "year": d.getFullYear()
        },
        "sensordata": {
            "levels": {
                "battery": Math.floor((Math.random() * 100) + 1),
                "oil": Math.floor((Math.random() * 100) + 1),
                "brake_fluid": Math.floor((Math.random() * 100) + 1),
                "windshield_washer_fluid": Math.floor((Math.random() * 100) + 1), 
                 "tires_pressure": Math.floor((Math.random() * 100) + 1)
            
            },
            "engine_RPM": Math.floor((Math.random() * 100) + 1),
            "temperatures": {
                "engine": Math.floor((Math.random() * 100) + 1),
                "outside": Math.floor((Math.random() * 100) + 1)
            }
        }
    };
    return car;
}
var last = function(err, selected) {
    console.log(err);
    exports.last = selected[selected.length - 1];
};

var period = function(doc) {
    start = 20;
    if (doc.timestamp.day > start) {
        return doc;
    }

};
var period_element = function(err, selected) {
    var element = [];
    selected.forEach(function(o) {
        element.push(o.sensordata);
    });
    console.log(err);
    console.log(element);
};

exports.read_last = function() {
    nosql.all(last);
};
exports.insert = function() {
    nosql.insert(init_car());
};

exports.read_period = function() {
    nosql.all(period, period_element);
};
