var app = angular.module("classifieds", ["ui.router"])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider.state("home",
            {
                url: "/home",
                views: {
                    body: {
                        templateUrl: "pages/home.html"
                    }
                }
            })
            .state("login",
            {
                url: "/",
                views: {
                    body: {
                        templateUrl: "pages/login.html"
                    }
                }
            })

            .state("registration",
            {
                url: "/registration",
                views: {
                    body: {
                        templateUrl: "pages/registration.html"
                    }
                }
            })
            .state("addDetails",
            {
                url: "/addDetails",
                views: {
                    body: {
                        templateUrl: "pages/addDetails.html"
                    }
                },
                params: {
                    id: null
                }
            });
    });
app.controller("loginController", function ($scope, $http, $state) {
    $scope.username = "User1";
    $scope.password = "12345";
    $scope.login = function () {
        if (!$scope.username) {
            alert("enter username");
            return;
        }
        if (!$scope.password) {
            alert("enter password");
            return;
        }
        var data = {
            "username": $scope.username,
            "password": $scope.password
        }
        $http.post("/users/login", data).then(function (response) {
            if (response.data == "pass") {
                $state.go("home");
            }
        });

    }
    $scope.registration = function () {

        $state.go("registration");
    }

});
