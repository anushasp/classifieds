var app = angular.module("classifieds")
app.controller("addDetailsController", function ($scope, $http, $state, $stateParams) {
    var data = {
            "adsname": $scope.adsname,
            "description":$scope.description,
            "price": $scope.price,
            "imageUrl": [$scope.image0,$scope.image1,$scope.image2]
        }
        
        $http.get("/ads/"+$stateParams.id).then(function (res) {
            $scope.ads = res.data;
            console.log("1212"+res.data);
            $scope.name=res.data.adsname;
            $scope.desc=res.data.description;
            $scope.cost=res.data.price;
            $scope.img0=res.data.imageUrl[0];
            $scope.img1=res.data.imageUrl[1];
            $scope.img2=res.data.imageUrl[2];
            $scope.created=res.data.created;
        });
    


});