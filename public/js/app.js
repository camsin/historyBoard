
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
app.controller('newPublication',['$scope','$http', function($scope, $http){
    $scope.vm = {object:{}};

    $scope.newPost = function(publication){
      console.log("TITULOS ALV", publication.title);
      console.log("IMAGEN CACA", publication.preview);
      console.log("ZDFGHDG", publication);
      /*'imageURL',fd, {transformRequest: angular.identity,
                headers: {
              'Content-Type': undefined
            }
          }*/
      $http({
             url:'/publications/test/2',
             method:'POST',
             data: {publication:publication}
         }).then(function(data){
             console.log("DATA", data);
             // $window.location.href = "/detalleProyecto";
         }, function(data){
             console.log("NOSE", $scope.vm.img);
             // $window.location.href = "/addReleaseBacklog";
         });
    }
}]);
/*app.controller('newPublication',['$scope','$http', function($scope, $http){
    $scope.vm = {object:{}};

    $scope.newPost = function(publication){

      console.log("IMAGEN ALV", publication.preview);
      console.log("TITULO ALV", publication.title);

      $http({
             url:'/publications/test/2',
             method:'POST',
             data: {publication:publication}
         }).then(function(data){
             console.log("DATA", data);
             // $window.location.href = "/detalleProyecto";
         }, function(data){
             console.log("NOSE", publication.img);
             // $window.location.href = "/addReleaseBacklog";
         });
          /*$http.post('/publications/test/2').success(data => {
              publication = publication;
              console.log("SI TENGO DATA", data);
          }).error(err => {
              console.log("ERROR ALV", err);
          });


    }
}]);*/
