var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile('../public/HTML1.html');
});

module.exports = router;