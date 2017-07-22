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
    return;
});

router.get('/genders',function(req,res){
var genders={
    "F":"female",
    "M":"male",
    "U":"unspecified"
};
res.send(JSON.stringify(genders));
});

router.get('/current', function (req, res) {
    var username = req.session.login;
    var users = fetchUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].name == username) {
            user = users[i];
            res.send(username);
            return;
        }
    }
    res.send("");
});


router.get('/logout', function (req, res) {
    //delete req.session.login;
    req.session.destroy();
    res.send("logout");
    return;
});

/*
router.get('/logout', function(req, res){
    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.send('logout');
});
*/

router.get('/:name', function (req, res) {
    var name = req.params.name.toUpperCase();
    var users = fetchUsers();

    for (var i = 0; i < users.length; i++) {
        if (users[i].name.toUpperCase() == name) {
            delete users[i].password;
            res.send(JSON.stringify(users[i]));
            return;
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
        created: new Date().valueOf(),
        admin: false
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
                req.session.login = username;
                res.send('pass');
                return;
            }
        }
    }
    res.send('fail');
});


function fetchUsers() {
    var jsonString = fs.readFileSync(path.join(__dirname, "users.json"), "utf8").trim();
    var users = JSON.parse(jsonString);
    return users;
}

function saveUsers(users) {
    fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users));
}


module.exports = router;