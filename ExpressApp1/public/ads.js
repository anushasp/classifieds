function listAds() {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "/ads/");
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.send();
}
function reqListener() {
    var list = JSON.parse(this.responseText);
    var table1 = document.getElementById("table1");
    var html = "<tr><th>Ads-ID</th><th>Description</th><th>Image-url</th></tr>";
    for (var i = 0; i < list.length; i++) {
        var add = list[i];
        html += "<tr><td>"+add["adsId"]+"</td><td>" + add["description"]+"</td><td>"+"<img src="+ add["imageUrl"]+"></img>"+"</td></tr>";
    }
    table1.innerHTML = html;
}
listAds();