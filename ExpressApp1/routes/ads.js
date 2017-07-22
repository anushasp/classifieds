var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


router.get('/', function (req, res) {
    var ads = fetchAds();
    var getads = [];
    for (var i = 0; i < ads.length; i++) {
        if (ads[i].status == "active") {
            getads.push(ads[i]);
        }
    }
    res.send(JSON.stringify(getads));
    return;
});

router.get('/:adsId', function (req, res) {
    var ads = fetchAds();
    var adsId = req.params.adsId;
    for (var i = 0; i < ads.length; i++) {
        if (ads[i].adsid == adsId) {
            res.send(JSON.stringify(ads[i]));
            return;
        }
    }
    res.send("Not Found");
});

router.post('/addad', function (req, res) {
    if (req.body.adsname && +req.body.price > 0) {
        var users = fetchUsers();
        var ads = fetchAds();
        var username = req.session.login;
        for (var i = 0; i < users.length; i++) {
            if (users[i].name == username) {
                var contactemail = users[i].email
            }
        }
        var ad = {
            adsid: ads.length + 1,
            adsname: String(req.body.adsname),
            description: String(req.body.description),
            created: new Date().valueOf(),
            imageUrl: req.body.imageUrl,
            price: +req.body.price,
            status: "active",
            owner: username,
            contact: contactemail
        };
        ads.push(ad);
        saveAds(ads);
        res.send("pass");
        return;
    }
    res.send("fail");
    return;
});
router.post('/searchad', function (req, res) {
    if (req.body.searchAd) {
        var ads = fetchAds();
        var adsname = req.body.searchAd;
        for (var i = 0; i < ads.length; i++) {
            if (ads[i].adsname == adsname) {
                res.send({ "id": ads[i]["adsid"] });
                return;
            }
        }
    }
    res.send("Not Found");
    return;
});


router.post('/editad', function (req, res) {
    var ads = fetchAds();
    var username = req.session.login;
    var adsid = req.body.adsid;
    for (var i = 0; i < ads.length; i++) {

        if (ads[i].adsid == adsid) {
            if (ads[i].owner != username) {
                res.send("invalid owner");
                return;
            }
            var adsedit = ads[i];
            var ad = {
                adsid: adsid,
                adsname: String(req.body.adsname),
                description: String(req.body.description),
                created: new Date().valueOf(),
                imageUrl: req.body.imageUrl,
                price: +req.body.price
            };
            for (var key in adsedit) {
                if (ad[key] != "" && ad[key] != "undefined" && ad[key] != null) {
                    if (key == "imageUrl") {
                        if (ad[key][0] != "" && ad[key][0] != null) {
                            adsedit[key][0] = ad[key][0];
                        }
                        if (ad[key][1] != "" && ad[key][1] != null) {
                            adsedit[key][1] = ad[key][1];
                        }
                        if (ad[key][2] != "" && ad[key][2] != null) {
                            adsedit[key][2] = ad[key][2];
                        }
                    } else {
                        adsedit[key] = ad[key];
                    }
                }
            }
            saveAds(ads);
            res.send("pass");
            return;
        }
    }
    res.send("fail");

});

router.post('/inactivead', function (req, res) {
    var ads = fetchAds();
    var username = req.session.login;
    var adsid = req.body.adsid;
    for (var i = 0; i < ads.length; i++) {
        if (ads[i].adsid == adsid) {
            if (ads[i].owner != username) {
                res.send("invalid owner");
                return;
            }
            var ad = {
                status: "inactive"
            };
            for (var key in ads[i]) {
                if (key == "status") {
                    ads[i][key] = ad[key]
                }
            }
            saveAds(ads);
            res.send("pass");
            return;
        }
    }

});


router.post('/addcomments', function (req, res) {
    var ads = fetchAds();
    var adsid = req.body.adsid;
    for (var i = 0; i < ads.length; i++) {
        if (ads[i].adsid == adsid) {
            console.log(req.body.comments);
            (ads[i].comments).push(req.body.comments);
            console.log(ads[i].comments);



        }
    }

    saveAds(ads);
    res.send("pass");
    return;

});


function fetchAds() {
    var jsonString = fs.readFileSync(path.join(__dirname, "ads.json"), "utf8").trim();
    var ads = JSON.parse(jsonString);
    return ads;
}

function fetchUsers() {
    var jsonString = fs.readFileSync(path.join(__dirname, "users.json"), "utf8").trim();
    var users = JSON.parse(jsonString);
    return users;
}
function saveAds(ads) {
    fs.writeFileSync(path.join(__dirname, "ads.json"), JSON.stringify(ads));
}
module.exports = router;