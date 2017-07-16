function searchAds() {
    var searchAd=document.getElementById("search").value;
    var data = "searchAd="+searchAd;
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener1);
    oReq.open("POST", "/ads/searchad");
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.send(data);
}
function reqListener1() {
    if (this.responseText != "Not Found") {
        window.location.href = "/addDetails.html?id="+this.responseText;
    } else {
        alert("cannot find");
    }
}