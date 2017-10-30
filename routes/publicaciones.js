var express = require('express');
var router = express.Router();
/*
Controlador para estado
const publicacionesController = require('../controlers/publicaciones/publicaciones');
*/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('publicaciones', { title: 'publicaciones' });
});

router.get('/byEstado', function(req, res, next) {
  res.render('publicaciones/byEstado', {
    title: 'publicaciones',
    state: 'Chihuahuita'});
});


/*router.get('/byEstado/:state', function(req, res, next) {
    User.findOne({
      //params contiene el arreglo de valores que lleguen
      _id : req.params.id
    }, (err,user)=>{
      if(err){
          res.send("Error");
      } else {
        res.render('users/show',{
          user:user
        });
      }
    });
});*/

module.exports = router;
