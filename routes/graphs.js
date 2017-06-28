var express = require('express');
var router = express.Router();
var nosql = require('./nosql_controller.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    nosql.read_period();
    res.render('graphs', {
        title: 'Graphs'
    });
});

module.exports = router;
