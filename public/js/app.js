
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


    $scope.newPost = function(publication){
      console.log("TITULOS ALV", publication.title);
      console.log("IMAGEN CACA", publication.preview);
      console.log("PUBLICATION", publication);

      let formData = new FormData();
      formData.append("title", publication.title);
      formData.append("content", publication.content);
      formData.append("date", publication.date);
      formData.append("state", publication.state);

      formData.append("preview", document.querySelector("[name='preview']").files[0]);
      formData.append("head", document.querySelector("[name='head']").files[0]);
      console.log("CARAMBOLAS",document.querySelector("[name='preview']").files[0]);
      formData.append("img1", document.querySelector("[name='img1']").files[0]);
      formData.append("img2", document.querySelector("[name='img2']").files[0]);
      formData.append("img3", document.querySelector("[name='img3']").files[0]);
      formData.append("img4", document.querySelector("[name='img4']").files[0]);
      formData.append("img5", document.querySelector("[name='img5']").files[0]);

      let request = new XMLHttpRequest();
      request.open('POST','/publications/test/2');
      request.send(formData);

      /*$http({
             url:'/publications/test/2',
             method:'POST',
             data: {publication:publication}
         }).then(function(data){
             console.log("DATA", data);
             // $window.location.href = "/detalleProyecto";
         }, function(data){
             console.log("NOSE", $scope.vm.img);
             // $window.location.href = "/addReleaseBacklog";
         });*/
    }
}]);
