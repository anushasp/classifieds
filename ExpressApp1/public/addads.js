function addAds() {
    //get username
    var adsid=document.getElementById("adsid").value;
    var adsname = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var image0= document.getElementById("image0").value;
    var image1= document.getElementById("image1").value;
    var image2= document.getElementById("image2").value;
    var images=[image0,image1,image2];

    if (adsname == "") {
        alert("Enter Adsname");
        return;
    }
    if (description == "") {
        alert("Enter description");
        return;
    }
    
    var data = "adsid="+adsid+"&adsname=" + adsname + "&description=" + description + "&price=" + price +"&imageUrl=" + images;
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("POST", "/ads/addad");
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.send(data);
}
function reqListener() {
    if (this.responseText == "pass") {
        window.location.href = "/adds.html";
    } else {
        alert("cannot add Ads");
    }
}