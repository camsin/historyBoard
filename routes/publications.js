var express = require('express');
var router = express.Router();
const publicationsController = require('../controllers/publications/publications');


//MAPA
router.get('/byState', publicationsController.map);

//publications por state
router.get('/byState/:state', publicationsController.byState);

//publications por año
router.get('/byDate', publicationsController.byDate);

//Ultimas publications
router.get('/lastPublications', publicationsController.lastPublications);

//publication por ID
router.get('/byId/:id', publicationsController.byId);

// Editar publication
// router.get('/editar/:content', (req, res, next) => {
//   res.render('publication/editar', {showSideNav: true,
//     content: req.params.content
//   });
// });

// nueva publication
router.get('/new/:content', publicationsController.newPublication);

//Mis publications
router.get('/myPublications', publicationsController.myPublications);


module.exports = router;
