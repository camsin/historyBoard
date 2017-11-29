const express = require('express');
const router = express.Router();
const publicationsController = require('../controllers/publications/publications');
const isLoggedIn = require('./../auth/passport.js').isLoggedIn;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
let type = upload.any();

module.exports = function(io) {

  router.post("/delete/:id", isLoggedIn, publicationsController.deletePublication);
  //     router.get('/myPublications', isLoggedIn, publicationsController.myPublications);

    //images display
    router.get('/getComments/:id', publicationsController.getComments);

    //images display
    router.post('/newComment', publicationsController.newComment);

    router.get('/getCommentsCount/:id', publicationsController.getCommentsCount);

    //images display
    router.get('/getImages/:id', publicationsController.getImages);

    //publication save
    router.get('/uploadPublication', publicationsController.uploadPublication);

    router.post('/uploadPublication/:contenido', type, publicationsController.uploadPublication);
//MAPA
    router.get('/byState', isLoggedIn, publicationsController.map);

//publications por state
    router.get('/byState/:state', isLoggedIn, publicationsController.byState);

    router.get('/getPublicationsByState/:state', isLoggedIn, publicationsController.getPublicationsByState);

//publications por año
    router.get('/byDate', isLoggedIn, publicationsController.byDate);

//Ultimas publications
    router.get('/lastPublications', isLoggedIn, publicationsController.lastPublications);
    router.get('/getAllPublications', isLoggedIn, publicationsController.getAllPublications);

//publication por ID
    router.get('/getData/:id', isLoggedIn, publicationsController.getData);
    router.get('/byId/:id', isLoggedIn, publicationsController.byId);

router.get('/edit/:id', isLoggedIn, publicationsController.editPublication);
router.post('/saveEdit/:id', isLoggedIn, type, publicationsController.saveEdit);
// Editar publication
// router.get('/editar/:content', (req, res, next) => {
//   res.render('publication/editar', {showSideNav: true,
//     content: req.params.content
//   });
// });

// nueva publication
    router.get('/new/:content', isLoggedIn, publicationsController.newPublication);

//Mis publications
router.get('/myPublications',isLoggedIn,  publicationsController.myPublications);
router.get('/getMyPublications', isLoggedIn, publicationsController.getMyPublications);

    //router.get('/getMyPublications', isLoggedIn, publicationsController.getMyPublications);

//Publicaciones por usuario especifico
    router.get('/userPublications/:id', isLoggedIn, publicationsController.userPublications);
    router.get('/getUserPublications/:id', isLoggedIn, publicationsController.getUserPublications);

    io.on('connection', function(socket){

        console.log('**********************************************************');
        console.log('mensaje desde socket.io en el archivo de rutas publications.js');
        console.log('**********************************************************');


        socket.on("newPublication", function(data){
            io.emit('getPublications');
        });

        socket.on("newComment", function(data){
            io.emit('getComments');
        });

        socket.on('newNotification', function(data){
            io.emit('getLimitNotifications');

        });
    });


    return router;
};
