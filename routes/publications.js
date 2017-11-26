const express = require('express');
const router = express.Router();
const publicationsController = require('../controllers/publications/publications');
const isLoggedIn = require('./../auth/passport.js').isLoggedIn;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
let type = upload.any();

module.exports = function(io) {


    io.on('connection', function(socket){
        console.log('**********************************************************');
        console.log('mensaje desde socket.io en el archivo de rutas publications.js');
        console.log('**********************************************************');
        socket.emit('popo');

        socket.emit("getAllPublications");

        // socket.on('newPublication', function(data){
        //     console.log("NEW PUBLICATION DATA", data);
        // });
    });
    //images display
    router.get('/getComments/:id', publicationsController.getComments);

    //images display
    router.get('/newComment', publicationsController.newComment);
    //images display
    router.post('/newComment/:comment', publicationsController.newComment);

    //images display
    router.get('/getImages/:id', publicationsController.getImages);

    //publication save
    router.get('/uploadPublication', publicationsController.uploadPublication);

    router.post('/uploadPublication/:contenido', type, publicationsController.uploadPublication);
//MAPA
    router.get('/byState', isLoggedIn, publicationsController.map);

//publications por state
    router.get('/byState/:state', isLoggedIn, publicationsController.byState);

//publications por año
    router.get('/byDate', isLoggedIn, publicationsController.byDate);

//Ultimas publications
    router.get('/lastPublications', isLoggedIn, publicationsController.lastPublications);
    router.get('/getAllPublications', isLoggedIn, publicationsController.getAllPublications);

//publication por ID
    router.get('/byId/:id', isLoggedIn, publicationsController.byId);

// Editar publication
// router.get('/editar/:content', (req, res, next) => {
//   res.render('publication/editar', {showSideNav: true,
//     content: req.params.content
//   });
// });

// nueva publication
    router.get('/new/:content', isLoggedIn, publicationsController.newPublication);

//Mis publications
    router.get('/myPublications', isLoggedIn, publicationsController.myPublications);
    router.get('/getMyPublications', isLoggedIn, publicationsController.getMyPublications);


    return router;
};