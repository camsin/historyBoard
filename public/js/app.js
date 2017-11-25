
var app = angular.module('historyBoardApp', []);

app.controller('usersController', ['$scope', '$http', function ($scope, $http) {

    $scope.getUser = function (idUser) {
        console.log("user", idUser);
    };
}]);

app.controller('lastPublicationsController', ['$scope', '$http', function ($scope, $http) {

    $scope.userId = "";
    $scope.lastPublications = [];
    $scope.publication = [];
    $scope.imagesId = [];

    $scope.init = function () {
        $scope.getAllPublications();
    };


    $scope.getAllPublications = function(){
        $http.get('getAllPublications').success(data => {
             $scope.lastPublications = data;

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
            console.log("Success");
        }).error(err => {
            console.log("ERROR", err);
        });


    };




}]);
app.controller('newPublication',['$scope','$http', function($scope, $http){

    $scope.vm = {object:{
      date : new Date()
    }};

    $scope.newPost = function(publication){

      let formData = new FormData();
      formData.append("title", publication.title);
      formData.append("content", publication.content);
      formData.append("date", publication.date);
      formData.append("state", publication.state);

      formData.append("preview", document.querySelector("[name='preview']").files[0]);
      formData.append("head", document.querySelector("[name='head']").files[0]);
      formData.append("img1", document.querySelector("[name='img1']").files[0]);
      formData.append("img2", document.querySelector("[name='img2']").files[0]);
      formData.append("img3", document.querySelector("[name='img3']").files[0]);
      formData.append("img4", document.querySelector("[name='img4']").files[0]);
      formData.append("img5", document.querySelector("[name='img5']").files[0]);

      let request = new XMLHttpRequest();
      request.open('POST','/publications/uploadPublication/2');
      request.send(formData);

    }
}]);

app.controller('commentsController', ['$scope', '$http', function ($scope, $http) {

    $scope.cosa;
    $scope.vm = {object:{
      date : new Date(),
    }};
    $scope.comments = [];

    $scope.init = function (id) {
      $scope.vm.object.publication = id;
      $scope.getComments(id);
    };

    $scope.getComments = function(id){
        $http.get('/publications/getComments/' + id).success(data => {
            $scope.comments = data;
            console.log("Success",data);
        }).error(err => {
            console.log("ERROR", err);
        });
    };
        $scope.newComment = function(comment){
          $http({
            method: 'POST',
            url: '/publications/newComment/1',
            data: comment
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
        };


    }]);

///Fecth data de la barra de direccniones para enviarselo a angular, ya con eso llamar a una funcion que trar el json de la publicacion con el
// bind
