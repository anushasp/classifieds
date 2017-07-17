var app = angular.module("classifieds")
app.controller("registrationController", function ($scope, $http, $state) {
     $scope.register = function () {
        if (!$scope.username) {
            alert("enter username");
            return;
        }
        if (!$scope.email) {
            alert("enter email");
            return;
        }
        if (!$scope.password) {
            alert("enter password");
            return;
        }
        if (!$scope.password2) {
            alert("retype password");
            return;
        }
        var data = {
            "username": $scope.username,
            "email":$scope.email,
            "password": $scope.password,
            "password2": $scope.password2,

        }
        $http.post("/users/add", data).then(function (response) {
            $scope.Message = response.data;
            if (response.data == "pass") {
                $scope.Message = "Registered Succesfully";
            }
        });


     }
        $scope.gotoLogin = function () {

            $state.go("login");
            }

});