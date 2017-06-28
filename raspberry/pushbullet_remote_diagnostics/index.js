var fs = require('fs');
var settings = JSON.parse(fs.readFileSync('/home/pi/settings.json', 'utf8'));
var PushBullet = require('pushbullet');
var pusher = new PushBullet(settings.key);
var cmd = require('node-cmd');
var os = require('os');

// pusher.devices(function(error, response) {
//     // response is the JSON response from the API
//     console.log(response);
// });

// pusher.createDevice('Raspberry', function(error, response) {});

var systeminfo = {
    info: os.type().toString() + ' ' + os.platform().toString() + ' ' + os.arch().toString() + '\n',
    interface: [],
    init: function() {
        var ifaces = os.networkInterfaces();
        Object.keys(ifaces).forEach(function(ifname) {
            var alias = 0;
            ifaces[ifname].forEach(function(iface) {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                    return;
                }
                if (alias >= 1) {
                    // this single interface has multiple ipv4 addresses
                    systeminfo.interface.push({ "ifname": ifname + ':' + alias, "ip": iface.address });
                } else {
                    // this interface has only one ipv4 adress
                    systeminfo.interface.push({ "ifname": ifname, "ip": iface.address });
                }
                ++alias;
            });
        });
    },
    getInfo: function() {
        return this.info.toString() + JSON.stringify(this.interface);
    }
};
systeminfo.init();

var systemCommands = {
    init: function(command) {
        switch (command) {
            case "shutdown":
                    this.shutdown();
                break;
            case "reboot":
                    this.reboot();
                break;
            case "update":
                console.log("Update");
                break;
            default:
                console.log("Sorry, wrong command.");
        }
    },
    shutdown: function() {
         stream.close();
         cmd.run('sudo shutdown now');
    },
    reboot: function() {
        stream.close();
        cmd.run('sudo reboot');
    }
};

function sendNote(deviceIden,noteTitle,noteBody) {
  pusher.note(deviceIden, noteTitle, noteBody, function(error, response) {
    });
};

var noteBody = 'My info: \n' + systeminfo.getInfo();
var noteTitle = "Hi, I'm online, Raspberry is up!";

// Nexus
sendNote(settings.phone,noteTitle,noteBody);

var options = {
    limit: 1,
    modified_after: 1400000000.00000
};

var stream = pusher.stream();
stream.connect();
stream.on('tickle', function(type) {
    if (type === "push") {
        pusher.history(options, function(error, response) {
            systemCommands.init(response.pushes[0].body);
            console.log(response.pushes[0].body);
        });
    }
});


