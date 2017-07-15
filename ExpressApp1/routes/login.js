var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


router.get('/', function (req, res) {
    var users = fetchUsers();
    for (i = 0; i < users.length; i++) {
        delete users[i].password;
    }
    res.send(JSON.stringify(users));
});

router.get('/:name', function(req, res) {
    router.get('/:name', function (req, res) {
        var name = req.params.name.toUpperCase();
        var users = fetchUsers();

        for (var i = 0; i < users.length; i++) {
            if (users[i].name.toUpperCase() == name) {
                delete users[i].password;
                res.send(JSON.stringify(users[i]));
            }
        }
        res.send("null");
    });
/* GET users listing. */
/*router.get('/', function (req, res) {
    res.send('respond with a resource');
});*/

function fetchUsers() {
    var jsonString = fs.readFileSync(path.join(__dirname, "..", "data", "users.json"), "utf8").trim();
    var users = JSON.parse(jsonString);
    return users;
}

function saveUsers(users) {
    fs.writeFileSync(path.join(__dirname, "..", "data", "users.json"), JSON.stringify(users));
}


module.exports = router;