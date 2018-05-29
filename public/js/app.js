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

app.controller('myPublicationsController', ['$scope', '$http', 'toastr', 'socket','$window', function ($scope, $http, toastr, socket, $window) {

    $scope.userId = "";
    $scope.lastPublications = [];
    $scope.commentsCount = 0;

    // socket.emit('newNotification');

    $scope.init = function () {
        $scope.getMyPublications();
    };
    $scope.id = function(id){
        $scope.publicationId = id;
    };
    $scope.delete = function(id) {
        $http.post('delete/'+id).then(
            function successCallback(){
                console.log("okey");
                //$window.location.reload();
                $scope.getMyPublications();
                toastr.success("Tu publicacion fue eliminada :(");
            },
            function errorCallback(error){
                console.log(error);
            }
        );
    };
    $scope.getMyPublications = function(){
        $http.get('/publications/getMyPublications').success(data => {
            $scope.myPublications = data;
    }).error(err => {
            toastr.error('Hubo un error obteniendo tus publicaciones', 'Error');
    });
        // $http.get('getMyPublications').then(function successCallback(data) {
        //     $scope.lastPublications = data;
        // }, function errorCallback(response) {
        //     toastr.error('Hubo un error obteniendo tus publicaciones', 'Error');
        // });
    };

    // $scope.getCommentsCount = function(idPublication, index){
    //     $http.get('/publications/getCommentsCount/'+ idPublication).success(data => {
    //         $scope.lastPublications[index].commentsCount = data;
    //     });
    // };

}]);

app.controller('profileController', ['$scope', '$http', 'toastr', 'socket','$window', function ($scope, $http, toastr, socket, $window) {
    $scope.userInfo = {};

    // socket.emit('newNotification');

    $scope.init = function(){
        $scope.getMyProfile();
    };

    $scope.img = 0;

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
    $scope.click= function(){
        $scope.img++
    }

    $scope.saveUser = function () {
        if($scope.password !== undefined && $scope.confirmPassword !== undefined){
            if($scope.password === $scope.confirmPassword){
                console.log("SIGO ENTRANDO AQUI");
                //     $http({
                //         url:'updateMyProfile',
                //         method:'POST',
                //         data: {name:$scope.userInfo.name,
                //             password:$scope.password}
                //     }).then(function(data){
                //         if(data.err){
                //             toastr.error('Tu perfil no se actualizo correctamente', 'Error');
                //         }
                //         toastr.success('CORRECTAMENTE', 'Tu perfil se ha actualizado');
                //     });
                // }else{
                //     toastr.error('Las contraseñas no coinciden', 'Error');
                // }

                let formData = new FormData();
                formData.append("name", $scope.userInfo.name);
                formData.append("password", $scope.password);
                if($scope.img > 0){
                    formData.append("profilePicture", document.querySelector("[name='profilePicture']").files[0]);
                }
                let request = new XMLHttpRequest();
                request.open('POST','updateMyProfile');
                request.send(formData);
                setTimeout(() => $window.location.reload(), 2000);
                toastr.success('CORRECTAMENTE', 'Tu perfil se ha actualizado');
            }else{
                toastr.error('Las contraseñas no coinciden', 'Error');
            }

        }else{
            toastr.error('Para guardar tus cambios debes de ingresar tu contraseña y confirmarla', 'Error');
        }
    };
}]);
app.controller('newPublication',['$scope','$http', 'socket','toastr', '$window', function($scope, $http, socket, toastr, $window){

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

        let keys = Object.keys(publication);

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


        // $http({
        //     method: 'POST',
        //     url: '/publications/uploadPublication',
        //     data: {publication:formData}
        // }).then(function successCallback(res) {
        //     console.log("RES", res);
        //     toastr.success("Tu publicacion se guardo exitosamente");
        // }, function errorCallback(err) {
        //     console.log("ERR",err);
        // });
        $http.post("/publications/uploadPublication",formData,{
            transformRequest: angular.identity,
            headers:{'Content-Type':undefined}
        })
            .then(function successCallback(object) {
                console.log(object);
                $window.location.href = "/publications/lastPublications";
                toastr.success("Tu publicacion fue guardada exitosamente");
            }, function errorCallback(error) {
                console.log(error);
                toastr.warning("Llena todos los campos");
            });

        /*

         let request = new XMLHttpRequest();
         request.open('POST','/publications/uploadPublication/2');
         request.setRequestHeader("enctype", "multipart/form-data");
         request.send(formData);*/

        socket.emit('newPublication');

    };
}]);

app.controller('commentsController', ['$scope', '$http','socket', function ($scope, $http, socket) {

    $scope.likes = 0;
    $scope.vm = {object:{
        date : new Date(),
    }};
    $scope.comments = [];

    $scope.init = function (id) {
        $scope.id = id;
        $scope.vm.object.publication = id;
        $scope.getData(id);
        $scope.getComments(id);
    };

    $scope.getData = function(id){
        $scope.data = [];
        $http.get('/publications/getData/' + id).success(data => {
            $scope.data = data;
        console.log(data);
    }).error(err => {
            console.log("ERROR", err);
    });
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

    $scope.updateLikes = function (idPublicacion) {
        console.log('id de la publicacion', idPublicacion);
        $scope.likes++;
        console.log('id de la publicacion aumentada', $scope.likes);

        $http({
            method: 'POST',
            url: '/publications/updatelikes/'+ idPublicacion,
            data: {likes: $scope.likes}
        }).then(function successCallback(res) {
        },function errorCallback(err) {
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

app.controller('userPublicationsController', ['$scope', '$http', 'toastr', function ($scope, $http, toastr) {
    $scope.init = function (idUsuario) {
        $scope.getUserPublications(idUsuario);
        $scope.getUserInfo(idUsuario);
    };

    $scope.getUserPublications = function (idUsuario) {
        console.log("get user pub", idUsuario);
        $http.get('/publications/getUserPublications/' + idUsuario).success(data => {
            console.log('data', data);
        $scope.userPublications = data;
    }).error(err => {
            toastr.error('Hubo un error al obtener las publicaciones', 'Error');
    });
    };

    $scope.getUserInfo = function (userInfo) {
        $http.get('/users/getUserById/' + userInfo).success(data => {
            $scope.userInfo = data;
    }).error(err => {
            toastr.error('Hubo un error al obtener las publicaciones', 'Error');
    });
    };

    $scope.getCommentsCount = function(idPublication, index){
        $http.get('/publications/getCommentsCount/'+ idPublication).success(data => {
            $scope.userPublications[index].commentsCount = data;
    });
    };


}]);

app.controller('publicationsByDateController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

    $scope.init = function(){
        $scope.getAllPublications();
    };

    $scope.getAllPublications = function(){
        $http.get('/publications/getAllPublications').success(data => {
            $scope.publications = data;
    }).error(err => {
            toastr.error('Hubo un error obteniendo publicaciones', 'Error');
    });
    };

    // $scope.getCommentsCount = function(idPublication, index){
    //     $http.get('/publications/getCommentsCount/'+ idPublication).success(data => {
    //         $scope.userPublications[index].commentsCount = data;
    // });
    // };

}]);

// parse a date in dd-mm-yyyy format
function parseDate(input) {
    console.log("INPUT", input);
    var parts = input.split('-');
    // Note: months are 0-based
    return new Date(parts[2], parts[1]-1, parts[0]);
}

app.filter("myfilter", function($filter) {
    return function(items, from) {
        console.log("ITEMS", items);
        console.log("FROM", from);
        // var df = parseDate(from);
        // var dt = parseDate(to);
        var publications = [];
        if(!from){
            publications = items;
            return publications;
        }else{
            for (var i=0; i<items.length; i++){
                var tf = new Date(items[i].date);
                // tt = new Date($filter('date')(items[i].date, "dd-MM-yyyy"));
                var year = tf.getFullYear();
                console.log("TF", tf);
                console.log("YEAR", year);
                if (parseInt(from) === year)  {
                    console.log("SON IGUALES");
                    publications.push(items[i]);
                }
            }

            // console.log("ARRAY TO RETURN", arrayToReturn);

            return publications;

        }
    };
});
app.controller('chatController',['$scope','$http','socket',function($scope,$http,socket) {

    $scope.input = "";

    // const socket = io('/chat');

    $scope.mensajes = new Array();

    $scope.sendMessage = function(){
        var msg = {mensaje:$scope.input, date:new Date(), user: $scope.userId};
        $http.post('/chat/m', msg).then(data => {
            console.log("DATA", data);
            $scope.input = "";
            $scope.getMessages();
        });
    };

    $scope.getMessages = function(){
        $http.get('/chat/g').success(data => {
            console.log("DATA", data);
        $scope.mensajes.push(data);
    }).error(err => {
            console.log("ERR", err);
        // toastr.error('Hubo un error obteniendo tus publicaciones', 'Error');
    });
    }

    // $('#boton').on('click',()=>{
    //     socket.emit('mensajeToSend',{mensaje:$scope.input, date:new Date(), user: $scope.userId});
    //     $scope.input = "";
    // })

    var wage = document.getElementById("texto");
    wage.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            $scope.sendMessage();
            // socket.emit('mensajeToSend',{mensaje:$scope.input, date:new Date(), user: $scope.userId});
            // $scope.input = "";
        }
    });

    socket.on('mensaje',function(msg){
        var mensajeJson = JSON.parse(msg);
        // $scope.getUser(mensajeJson.user);
        $http.get('/users/getUserById/'+ mensajeJson.user).success(data => {
            mensajeJson.user = data;
            $scope.mensajes.push(mensajeJson);
        }).error(err => {
                toastr.error('Hubo un error obteniendo el usuario', 'Error');
        });
            $scope.$apply();

    });
}]);
