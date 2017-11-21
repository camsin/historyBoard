
var app = angular.module('historyBoardApp', []);

app.controller('usersController', ['$scope', '$http', function ($scope, $http) {

    $scope.getUser = function (idUser) {
        console.log("user", idUser);
    };
}]);

app.controller('lastPublicationsController', ['$scope', '$http', function ($scope, $http) {

    $scope.userId = "";
    $scope.lastPublications = [];

    $scope.init = function () {
        $scope.getAllPublications();
    };


    $scope.getAllPublications = function(){
        $http.get('getAllPublications').success(data => {
            $scope.lastPublications = data;
            console.log("SI TENGO DATA", data);
        }).error(err => {
            console.log("ERROR ALV", err);
        });
    };

}]);

app.controller('myPublicationsController', ['$scope', '$http', function ($scope, $http) {

    $scope.userId = "";
    $scope.lastPublications = [];

    $scope.init = function () {
        $scope.getPublications();
    };

    $scope.getMyPublications = function(){
        $http.get('getMyPublications').success(data => {
            $scope.lastPublications = data;
            console.log("SI TENGO DATA", data);
        }).error(err => {
            console.log("ERROR ALV", err);
        });
    };

}]);

app.controller('profileController', ['$scope', '$http', function ($scope, $http) {
    $scope.userInfo = {};

    $scope.init = function(){
        $scope.getMyProfile();
    };

    $scope.getMyProfile = function () {
        $http.get('getMyProfile').success(data => {
            console.log("DTAA", data);
            $scope.userInfo = data;
        }).error(err => {
            console.log("ERROR ALV", err);
    });
    };
}]);