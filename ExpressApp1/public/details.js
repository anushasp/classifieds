

function addDetails() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    console.log(url.searchParams.get("name"));
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "/ads/"+id);
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.send();
}
function reqListener() {
    var ad = JSON.parse(this.responseText);
    console.log(ad);

    var adsname = document.getElementById("adsname");     
        adsname.innerHTML=ad["adsname"];

    var description = document.getElementById("description");
        description.innerHTML=ad["description"];
    
    var price = document.getElementById("price");
        price.innerHTML=ad["price"];

    var image0 = document.getElementById("image0");
        image0.src = ad["imageUrl"][0];

    var image1 = document.getElementById("image1");
        image1.src = ad["imageUrl"][1];

    var image2= document.getElementById("image2");
        image2.src = ad["imageUrl"][2];
    
var created = document.getElementById("date");
        created.innerHTML=ad["created"];

}

addDetails();