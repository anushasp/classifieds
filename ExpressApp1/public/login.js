function login() {
    //get username
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "") {
        alert("Enter username");
        return;
    }
    if (password == "") {
        alert("Enter password");
        return;
    }
    var data = "username=" + username + "&password=" + password;
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("POST", "/users/login");
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.send(data);
}

function reqListener() {
    if (this.responseText == "pass") {
        window.location.href = "/adds.html";
    } else {
        alert("Invalid user credentials");
    }
}

function registration() {
    window.location.href = "/registration.html";
}