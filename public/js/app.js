
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
    $scope.myPublications = [];

    $scope.init = function () {
        $scope.getPublications();
    };
    $scope.delete = function(id) {
      $http.post('delete/'+id).then(
        function successCallback(){
          console.log("okey");
        },
        function errorCallback(){
          console.log(error);
        }
      );
    };
    $scope.getMyPublications = function(){
        $http.get('getMyPublications').success(data => {
            $scope.myPublications = data;
            console.log("Success");
        }).error(err => {
            console.log("ERROR", err);
        });


    };




}]);

app.controller('profileController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.userInfo = {};

    $scope.init = function(){
        $scope.getMyProfile();
    };

    $scope.img = 0;

    $scope.getMyProfile = function () {
        $http.get('getMyProfile').success(data => {
            console.log("DTAA", data);
            $scope.userInfo = data;
        }).error(err => {
            console.log("ERROR ALV", err);
        });
    };
    $scope.click= function(){
      $scope.img++
    }

    $scope.saveUser = function () {
        if($scope.password === $scope.confirmPassword){
          let formData = new FormData();
          formData.append("name", $scope.userInfo.name);
          formData.append("password", $scope.password);
          //     $http({
          //         url:'updateMyProfile',
          //         method:'POST',
          //         data: {name:$scope.userInfo.name,
          //             password:$scope.password}
          //     }).then(function(data){
          //         console.log("DATA", data);
          //         // $window.location.href = "/detalleProyecto";
          //     }, function(data){
          //         console.log("NOSE", data);
          //         // $window.location.href = "/addReleaseBacklog";
          //     });
          //
          if($scope.img > 0){
            formData.append("profilePicture", document.querySelector("[name='profilePicture']").files[0]);
          }
          let request = new XMLHttpRequest();
          request.open('POST','updateMyProfile');
          request.send(formData);
          $window.location.reload();
        }else{
         console.log("PASS NO IGUALES");
        }
    };
}]);
app.controller('newPublication',['$scope','$http', function($scope, $http){

    $scope.vm = {object:{
      date : new Date()
    }};

    $scope.newPost = function(publication){
      let keys = Object.keys(publication);
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

      $http.post("/publications/uploadPublication/2",formData,{
        transformRequest: angular.identity,
        headers:{'Content-Type':undefined}
      })
      .then(function successCallback(object) {
        console.log(object);
      }, function errorCallback(error) {
        console.log(error);
      });

/*

      let request = new XMLHttpRequest();
      request.open('POST','/publications/uploadPublication/2');
      request.setRequestHeader("enctype", "multipart/form-data");
      request.send(formData);
*/
    }
}]);

app.controller('commentsController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.vm = {object:{
      date : new Date(),
    }};
    $scope.comments = [];

    $scope.init = function (id) {
      $scope.vm.object.publication = id;
      $scope.getComments(id);
    };

    $scope.getComments = function(id){
        $scope.comments = [];
        $http.get('/publications/getComments/' + id).success(data => {
            $scope.comments = data;
            console.log("Success",data);
        }).error(err => {
            console.log("ERROR", err);
        });
    };

    $scope.reloadPage = function(){$window.location.reload();}

    $scope.newComment = function(newComment){
      $http({
        method: 'POST',
        url: '/publications/newComment/1',
        data: newComment
      }).then(function successCallback(res) {
          $scope.reloadPage();
          $window.alert("Comentario agregado");
          console.log("Success");
        }, function errorCallback(err) {
            console.log("ERR",err);
          });
    };

    }]);

app.controller('editPublication',['$scope','$http', function($scope, $http){
        $scope.publications = {};
        $scope.init = function(publication){
          publication = JSON.parse(publication);
          console.log(publication);
          let keys = Object.keys(publication);
          for (var i = 0; i < keys.length; i++) {
            console.log(keys[i]);
            if(keys[i]=="date"){
              let date = new Date(publication.date);
              $scope.publications.date = new Date(date.getFullYear() +"-"+ date.getMonth() +"-"+ date.getDate());
              console.log($scope.publications.date);
            } else {
              $scope.publications[keys[i]] = publication[keys[i]];

            }
          }
        }
        $scope.vm = {object:{
          date : new Date()
        }};

        $scope.newPost = function(publication){
          let keys = Object.keys(publication);
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

          $http.post("/publications/uploadPublication/2",formData,{
            transformRequest: angular.identity,
            headers:{'Content-Type':undefined}
          })
          .then(function successCallback(object) {
            console.log(object);
          }, function errorCallback(error) {
            console.log(error);
          });

    /*

          let request = new XMLHttpRequest();
          request.open('POST','/publications/uploadPublication/2');
          request.setRequestHeader("enctype", "multipart/form-data");
          request.send(formData);
    */
        }
    }]);
