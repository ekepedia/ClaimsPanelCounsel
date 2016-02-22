var express = require( 'express' );
var router = express.Router();
var counsel = require( '../counsel' );
var config = require('../config');

router.route( '/' )
  .get( function( req, res ) {
    res.send( 'Welcome to Api' );
  });

router.route( '/vendor' )
  .get( function( req, res ) {
    counsel.Vendor.all().then( function( vendors ){
      res.send( vendors );
    });
  })
  .post( function( req, res){
    counsel.Vendor.create(req.body)
      .then( function(vendor) {
        res.redirect('/vendor');
      })
  });

router.route('/vendor/:id')
  .get( function( req, res) {
    counsel.Vendor.findById( 1 )
      .then( function( vendor ) {
        config.currentUser = vendor;
        res.redirect('../../update');
      });
  })
  .put( function( req, res ) {
    counsel.Vendor.findById( req.params.id )
      .then( function( vendor ) {
        vendor.updateAttributes( req.body )
          .then( function( vendor ) {
            res.redirect('vendor');
          });
      });
  });

router.route('/config')
  .get(function(req,res) {
    res.send(config);
  });
module.exports = router;