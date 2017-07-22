var app = angular.module("classifieds")
app.controller("usermodcontroller", function ($scope, $http) {

    $http.get("/users/genders").then(function (response) {
        $scope.genders = [];
        for (var key in response.data) {
            var gen = {
                id: key,
                name: response.data[key]
            }
            $scope.genders.push(gen);
        }


    });

    $http.get("/users").then(function (response) {
        $scope.users = response.data;
    });

    $scope.edit = function (username) {
        $http.get("/users/" + username).then(function (res) {
            $scope.user = {
                username: res.data.username,
                email: res.data.email,
                gender: res.data.gender
            };
        });


    }
});

