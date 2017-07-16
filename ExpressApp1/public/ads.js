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
    var html = "<tr><th>Ads-ID</th><th>Ads-name</th><th>Description</th><th>Price</th><th>Image-1</th><th>Image-2</th><th>Image-3</th></tr>";
    for (var i = 0; i < list.length; i++) {
        var add = list[i];
        html += "<tr><td>"+add["adsid"]+"</td><td>"+add["adsname"]+"</td><td>" +
         add["description"]+"</td><td>"+add["price"]+
        "</td><td>"+"<img src="+ add["imageUrl"][0]+"></img>"+
        "</td><td>"+"<img src="+ add["imageUrl"][1]+"></img>"+
        "</td><td>"+"<img src="+ add["imageUrl"][2]+"></img>"+"</td></tr>";
    }
    table1.innerHTML = html;
    addRowHandlers();
}

function addRowHandlers() {
    var table = document.getElementById("table1");
    var rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        var currentRow = rows[i];
            function createClickHandler(row) 
            {
                return function() { 
                                        var cell = row.getElementsByTagName("td")[0];
                                        var id = cell.innerHTML;
                                        goToAddDetails(id);
                                 };
            };

        currentRow.onclick = createClickHandler(currentRow);
    }
}

function goToAddDetails(id){
    window.location.href = "/addDetails.html?id="+id+"&name=test";
}

listAds();