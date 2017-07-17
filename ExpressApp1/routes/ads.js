var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


router.get('/', function (req, res) {
    var ads = fetchAds();
    res.send(JSON.stringify(ads));
});

router.get('/:adsId', function (req, res) {
    var ads = fetchAds();
    var adsId = req.params.adsId;
    for (var i = 0; i < ads.length; i++) {
        if (ads[i].adsid == adsId) {
            res.send(JSON.stringify(ads[i]));
        }
    }
    res.send("Not Found");
});

router.post('/addad', function (req, res) {
    if (req.body.adsname && +req.body.price > 0) {
        var ads = fetchAds();
        

        var ad = {
            adsid: ads.length + 1,
            adsname: String(req.body.adsname),
            description: String(req.body.description),
            created: new Date().valueOf(),
            imageUrl: req.body.imageUrl,
            price: +req.body.price
        };
        ads.push(ad);
        saveAds(ads);
        res.send("pass");
        return;
    }
    res.send("fail");

});
router.post('/searchad', function (req, res) {
    if (req.body.searchAd) {
        var ads = fetchAds();
        var adsname = req.body.searchAd;
        for (var i = 0; i < ads.length; i++) {
            if (ads[i].adsname == adsname) {
                res.send({"id":ads[i]["adsid"]});
            }
        }
    }
        res.send("Not Found");
    });


router.post('/editad', function (req, res) {
    var ads = fetchAds();
   
    var adsid = req.body.adsid;
    for (var i = 0; i < ads.length; i++) {

        if (ads[i].adsid == adsid) {
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
                if (ad[key]!= "" && ad[key] != "undefined") {
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

function fetchAds() {
    var jsonString = fs.readFileSync(path.join(__dirname, "ads.json"), "utf8").trim();
    var ads = JSON.parse(jsonString);
    return ads;
}
function saveAds(ads) {

    fs.writeFileSync(path.join(__dirname, "ads.json"), JSON.stringify(ads));
}
module.exports = router;