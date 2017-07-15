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
        if (ads[i].adsId == adsId) {
            res.send(JSON.stringify(ads[i]));
        }
    }
    res.send("Not Found");
});

router.post('/addads', function (req, res) {
  



});

function fetchAds() {
    var jsonString = fs.readFileSync(path.join(__dirname, "..", "public", "ads.json"), "utf8").trim();
    var ads = JSON.parse(jsonString);
    return ads;
}
function saveAds(ads) {

    fs.writeFileSync(path.join(__dirname, "..", "public", "ads.json"), JSON.stringify(ads));
}
module.exports = router;