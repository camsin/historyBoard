
var app = angular.module('historyBoardApp', ['toastr']);

app.factory('socket', ['$rootScope', function($rootScope) {
    var socket = io.connect();

    return {
        on: function(eventName, callback){
            socket.on(eventName, callback);
        },
        emit: function(eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);

app.controller('usersController', ['$scope', '$http', function ($scope, $http) {

    $scope.getUser = function (idUser) {
        console.log("user", idUser);
    };
}]);

app.controller('lastPublicationsController', ['$scope', '$http', 'toastr','socket', function ($scope, $http, toastr, socket) {

    $scope.userId = "";
    $scope.lastPublications = [];
    $scope.publication = [];
    $scope.imagesId = [];

    $scope.init = function () {
        $scope.getAllPublications();
    };

    // socket.on("getLastPublications", function(data){
    //     console.log("ESTOY ESCUCHANDO ESTE CANAL DE LAST PUBLICATIONS");
    //     $scope.getAllPublications();
    // });

    $scope.getAllPublications = function(){
        $http.get('getAllPublications').success(data => {
             $scope.lastPublications = data;
        }).error(err => {
            toastr.error('Hubo un error obteniendo publicaciones', 'Error');
        });
    };

    socket.on('popo', function (data) {
            console.log("ESTOY ESCUCHANDO ESTE CANAL DE LAST PUBLICATIONS");
            $scope.getAllPublications();
        // $scope.$apply();
    });


}]);

app.controller('myPublicationsController', ['$scope', '$http', 'toastr', function ($scope, $http, toastr) {

    $scope.userId = "";
    $scope.lastPublications = [];

    $scope.init = function () {
        $scope.getPublications();
    };

    $scope.getMyPublications = function(){
        $http.get('getMyPublications').success(data => {
            $scope.lastPublications = data;
        }).error(err => {
            toastr.error('Hubo un error obteniendo tus publicaciones', 'Error');
        });
    };

}]);

app.controller('profileController', ['$scope', '$http', 'toastr', function ($scope, $http, toastr) {
    $scope.userInfo = {};

    $scope.init = function(){
        $scope.getMyProfile();
    };

    $scope.getMyProfile = function () {
        $http.get('getMyProfile').success(data => {
            $scope.userInfo = data;
        }).error(err => {
            toastr.error('Hubo un error obteniendo tu perfil', 'Error');
        });
    };

    $scope.saveUser = function () {
        if($scope.password === $scope.confirmPassword){
            $http({
                url:'updateMyProfile',
                method:'POST',
                data: {name:$scope.userInfo.name,
                    password:$scope.password}
            }).then(function(data){
                if(data.err){
                    toastr.error('Tu perfil no se actualizo correctamente', 'Error');
                }
                toastr.success('CORRECTAMENTE', 'Tu perfil se ha actualizado');
            });
        }else{
            toastr.error('Las contraseñas no coinciden', 'Error');
        }
    };
}]);
app.controller('newPublication',['$scope','$http', 'socket', function($scope, $http, socket){

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

    $scope.newComment = function(newComment){
      $http({
        method: 'POST',
        url: '/publications/newComment/1',
        data: newComment
      }).then(function successCallback(res) {
          console.log("Success");
        }, function errorCallback(err) {
            console.log("ERR",err);
          });
    };

    }]);
