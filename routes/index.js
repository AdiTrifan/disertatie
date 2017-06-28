var express = require('express');
var router = express.Router();
var nosql = require('./nosql_controller.js');





/* GET home page. */
router.get('/', function(req, res, next) {
		nosql.insert();
		nosql.read_last();
    res.render('index', {
        title: 'Wireless Car Control'
    });

});
router.get('/carinfo', function(req, res, next) {
    var nosql = require('./nosql_controller.js');
    res.send(nosql.last);
});




module.exports = router;
