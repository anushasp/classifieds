function register() {
    //get username
    var username = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;
    var email = document.getElementById("email").value;
    if (username == "") {
        alert("Enter username");
        return;
    }
    if (email == "") {
        alert("Enter email");
        return;
    }
    if (password == "") {
        alert("Enter password");
        return;
    }
    if (password2 == "") {
        alert("Enter password2");
        return;
    }
    var data = "username=" + username + "&email=" + email + "&password=" + password +"&password2=" + password2;
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("POST", "/users/add");
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.send(data);
}

function reqListener() {
    if (this.responseText == "pass") {
        window.location.href = "/";
    } else {
        alert("error registration");
    }
}