
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
    $scope.vm = {object:{
      date : new Date()
    }};

    $scope.savePreview = function(event){
      console.log("SAVE ALV",event);
      let input = event;
      let reader = new FileReader();
      reader.onload = function(e){
          var data = e.target.result;
          $scope.vm.object.preview = new Uint8Array(data);
          console.log("AHHHHHRCVHIVO",$scope.vm);
      };
      reader.readAsArrayBuffer(input.files[0]);


    }

    $scope.newPost = function(publication){
      console.log("TITULOS ALV", publication.title);
      console.log("IMAGEN CACA", publication.preview);
      console.log("ZDFGHDG", publication);

      $http({
             headers: {'Content-Type': 'application/octet-stream'},
             url:'/publications/test/2',
             method:'POST',
             data: {publication:publication},
             transformRequest: []
         }).then(function(data){
             console.log("DATA", data);
             // $window.location.href = "/detalleProyecto";
         }, function(data){
             console.log("NOSE", $scope.vm.img);
             // $window.location.href = "/addReleaseBacklog";
         });
    }
}]);
