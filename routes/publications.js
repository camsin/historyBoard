var express = require('express');
var router = express.Router();
const publicationsController = require('../controllers/publications/publications');
const isLoggedIn = require('./../auth/passport.js').isLoggedIn;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
let type = upload.any();

router.get('/getImages/:id', publicationsController.getImages);

router.get('/uploadPublication', publicationsController.uploadPublication);

router.post('/uploadPublication/:contenido',type, publicationsController.uploadPublication);
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
router.get('/myPublications',isLoggedIn,  publicationsController.myPublications);
router.get('/getMyPublications', isLoggedIn, publicationsController.getMyPublications);


module.exports = router;
