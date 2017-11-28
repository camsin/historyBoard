
var app = angular.module('historyBoardApp', ['toastr', 'ngRoute']);

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
    $scope.commentsCount = 0;

    $scope.init = function () {
        $scope.getAllPublications();
    };

    // socket.emit('newNotification');


    $scope.getAllPublications = function(){
        // $http.get('getAllPublications').then(function successCallback(data) {
        //     $scope.lastPublications = data;
        // }, function errorCallback(response) {
        //         toastr.error('Hubo un error obteniendo publicaciones', 'Error');
        // });
        $http.get('/publications/getAllPublications').success(data => {
             $scope.lastPublications = data;
        }).error(err => {
            toastr.error('Hubo un error obteniendo publicaciones', 'Error');
        });
    };

    $scope.getCommentsCount = function(idPublication, index){
        $http.get('/publications/getCommentsCount/'+ idPublication).success(data => {
            $scope.lastPublications[index].commentsCount = data;
        });
    };

    socket.on('getPublications', function (data) {
            $scope.getAllPublications();
        $scope.$apply();
    });


}]);

app.controller('myPublicationsController', ['$scope', '$http', 'toastr', 'socket', function ($scope, $http, toastr, socket) {

    $scope.userId = "";
    $scope.lastPublications = [];
    $scope.commentsCount = 0;

    // socket.emit('newNotification');

    $scope.init = function () {
        $scope.getMyPublications();
    };

    $scope.getMyPublications = function(){
        $http.get('/publications/getMyPublications').success(data => {
            $scope.lastPublications = data;
        }).error(err => {
            toastr.error('Hubo un error obteniendo tus publicaciones', 'Error');
        });
        // $http.get('getMyPublications').then(function successCallback(data) {
        //     $scope.lastPublications = data;
        // }, function errorCallback(response) {
        //     toastr.error('Hubo un error obteniendo tus publicaciones', 'Error');
        // });
    };

    $scope.getCommentsCount = function(idPublication, index){
        $http.get('/publications/getCommentsCount/'+ idPublication).success(data => {
            $scope.lastPublications[index].commentsCount = data;
        });
    };

}]);

app.controller('profileController', ['$scope', '$http', 'toastr', 'socket', function ($scope, $http, toastr, socket) {
    $scope.userInfo = {};

    // socket.emit('newNotification');

    $scope.init = function(){
        $scope.getMyProfile();
    };

    $scope.getMyProfile = function () {
        $http.get('/users/getMyProfile').success(data => {
            $scope.userInfo = data;
        }).error(err => {
            toastr.error('Hubo un error obteniendo tu perfil', 'Error');
        });
        // $http.get('getMyPublications').then(function successCallback(data) {
        //     $scope.lastPublications = data;
        // }, function errorCallback(response) {
        //     toastr.error('Hubo un error obteniendo tus publicaciones', 'Error');
        // });
    };

    $scope.saveUser = function () {
        if($scope.password === $scope.confirmPassword){
            $http({
                url:'/users/updateMyProfile',
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

    $scope.init = function () {
        $scope.reload();
    };

    $scope.estados = ['Aguascalientes','Baja California','Baja California Sur', 'Campeche', 'Coahuila de Zaragoza', 'Colima',
        'Chiapas', 'Chihuahua', 'Distrito Federal', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México',
        'Michoacán de Ocampo', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
        'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz de Ignacio de la Llave',
        'Yucatán', 'Zacatecas'];

    $scope.vm = {object:{
      date : new Date()
    }};

    $scope.reload = function(){
        $('select').material_select();
    };

    // socket.emit('newNotification');

    $scope.newPost = function(publication){

        let state = $('#state').val();

      let formData = new FormData();
      formData.append("title", publication.title);
      formData.append("content", publication.content);
      formData.append("date", publication.date);
      formData.append("state", state);

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

      socket.emit('newPublication');

    };
}]);

app.controller('commentsController', ['$scope', '$http','socket', function ($scope, $http, socket) {

    $scope.vm = {object:{
      date : new Date(),
    }};
    $scope.comments = [];

    $scope.init = function (id) {
        $scope.id = id;
      $scope.vm.object.publication = id;
      $scope.getComments(id);
    };

    // socket.emit('newNotification');

    $scope.getComments = function(id){
        $scope.comments = [];
        $http.get('/publications/getComments/' + id).success(data => {
            $scope.comments = data;
        }).error(err => {
            console.log("ERROR", err);
        });
    };

    socket.on('getComments', function (data) {
        $scope.getComments($scope.id);
        $scope.$apply();
    });

    $scope.newComment = function(newComment){
      $http({
        method: 'POST',
        url: '/publications/newComment',
        data: newComment
      }).then(function successCallback(res) {
          socket.emit('newComment');
          $http({
              method: 'POST',
              url: '/notifications/add',
              data: {comment: res.data._id}
          }).then(function successCallback(res) {
                if(res.data!=="OK"){
                    socket.emit('newNotification');
                }
          }, function errorCallback(err) {
              console.log("ERR NOTIFICACION",err);
          });
          $scope.vm.object.content = "";
        }, function errorCallback(err) {
            console.log("ERR",err);
          });
    };

}]);


app.controller('notificationController', ['$scope', '$http','socket','$window', 'toastr', function ($scope, $http, socket, $window, toastr) {

    socket.emit('newNotification');

    socket.on('getLimitNotifications', function (data) {
        $scope.getLimitNotifications();
        $scope.$apply();
    });

    $scope.init = function(){
        $scope.getNotifications();
    };

    $scope.getLimitNotifications = function(){
        $http.get('/notifications/getLimit').success(data => {
            $scope.notifications = data;
        }).error(err => {
                console.log("ERROR", err);
        });
    };

    $scope.getNotifications = function(){
        $http.get('/notifications/get').success(data => {
            $scope.allNotifications = data;
        }).error(err => {
            toastr.error('Hubo un error al obtener tus notificaciones', 'Error');
        });
    };

    $scope.redirectPublication = function(idNotification, idPublication){
        $http({
            url:'/notifications/update',
            method:'POST',
            data: {notification: idNotification}
        }).then(function(data){
            if(!data.err){
                $window.location.href = "/publications/byId/"+idPublication;
            }
        });
    };

}]);

app.controller('publicationByStateController', ['$scope','$http', 'socket', 'toastr','$location',function($scope, $http, socket, toastr, $location){

    // socket.emit('newNotification');

    $scope.init = function(){
        let state = $('#state').val();
        $scope.getPublicationsByState(state);
    };

    $scope.getPublicationsByState = function(state){
        $http.get('/publications/getPublicationsByState/'+state).success(data => {
            $scope.publications = data;
        }).error(err => {
            toastr.error('Hubo un error al obtener las publicaciones', 'Error');
        });
    };

    $scope.getCommentsCount = function(idPublication, index){
        $http.get('/publications/getCommentsCount/'+ idPublication).success(data => {
            $scope.publications[index].commentsCount = data;
    });
    };

}]);
