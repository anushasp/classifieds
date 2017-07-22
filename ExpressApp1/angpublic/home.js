var app = angular.module("classifieds")
app.controller("homeController", function ($scope, $http, $state) {
    function getAds() {
        $http.get("/ads").then(function (res) {
            $scope.ads = res.data;
        });
    }
    getAds();

    $scope.searchAds = function () {
        var data = {
            "searchAd": $scope.search
        }
        $http.post("/ads/searchad", data).then(function (response) {
            if (response.data != "Not Found") {
                $state.go("addDetails", { "id": response.data.id });
            }
        });
    }
    $scope.logout = function () {
        $http.get("/users/logout").then(function (response) {
            if (response.data == "logout")
                $state.go("login");
        });

    }
    $scope.addAds = function () {
        if (!$scope.adsname) {
            alert("enter Ad-Name");
            return;
        }
        if (!$scope.description) {
            alert("enter Description");
            return;
        }
        if (!$scope.price) {
            alert("enter price");
            return;
        }
        var data = {
            "adsname": $scope.adsname,
            "description": $scope.description,
            "price": $scope.price,
            "imageUrl": [$scope.image0, $scope.image1, $scope.image2]
        }
        $http.post("/ads/addad", data).then(function (response) {
            if (response.data == "pass") {
                getAds();
            }
        });
    }
    $scope.editAds = function () {

        var data = {
            "adsid": $scope.adsid,
            "adsname": $scope.adsname,
            "description": $scope.description,
            "price": $scope.price,
            "imageUrl": [$scope.image0, $scope.image1, $scope.image2]
        }
        $http.post("/ads/editad", data).then(function (response) {
            if (response.data == "pass") {
                getAds();
            } else if (response.data == "invalid owner") {
                alert("You have to be owner to Update the Ad");
            }
        });
    }
    $scope.onClickAd = function (ad) {
        console.log(ad);
        $state.go("addDetails", { "id": ad.adsid });
    }


     $scope.inactiveAds = function () {
        var data = {
            "adsid": $scope.adsid,
            "adsname": $scope.adsname,
            "description": $scope.description,
            "price": $scope.price,
            "imageUrl": [$scope.image0, $scope.image1, $scope.image2]
        }
        $http.post("/ads/inactivead", data).then(function (response) {
            if (response.data == "pass") {
                getAds();
            } else if (response.data == "invalid owner") {
                alert("You have to be owner to inactive the Ad");
            }
        });
    }


    $scope.onClickAd = function (ad) {
        console.log(ad);
        $state.go("addDetails", { "id": ad.adsid });
    }





});