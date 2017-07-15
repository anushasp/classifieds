var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


router.get('/', function (req, res) {
    var users = fetchUsers();
    for (var i = 0; i < users.length; i++) {
        delete users[i].password;
    }
    res.send(JSON.stringify(users));
});


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
        res.send('rpond with a resource');
    });*/

    router.post("/add", function (req, res) {
        var users = fetchUsers();
        var username = req.body.username;
        if (!username) {
            res.send("Invalid user");
            return;
        }
        if (req.body.password != req.body.password2 || !req.body.password || !req.body.password2 || req.body.password.length < 5) {
            res.send('Bad password');
            return;
        }
        for (var i = 0; i < users.length; i++) {
            if (users[i].name.toUpperCase() == username.toUpperCase()) {
                res.send('Existed');
                return;
            }
        }
        var user = {
            name: username,
            password: req.body.password,
            email: req.body.email,
            created: new Date().valueOf()
        };
        users.push(user);
        saveUsers(users);
        res.send('pass');
    });

    router.post("/login", function (req, res) {
        var users = fetchUsers();
        var username = req.body.username;
        var password = req.body.password;
        for (var i = 0; i < users.length; i++) {
            if (users[i].name.toUpperCase() == username.toUpperCase()) {
                if (users[i].password == password) {
                    res.send('pass');
                }
            }
        }
        res.send('fail');
    });

    function fetchUsers() {
        var jsonString = fs.readFileSync(path.join(__dirname, "..", "public", "users.json"), "utf8").trim();
        var users = JSON.parse(jsonString);
        return users;
    }

    function saveUsers(users) {
        fs.writeFileSync(path.join(__dirname, "..", "public", "users.json"), JSON.stringify(users));
    }


module.exports = router;