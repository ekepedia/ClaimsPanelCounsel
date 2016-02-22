var config = require( './config' );

var counsel = {}

//load initial data
var data = loadData( config.excel.fileName, 1 );

//Connect to database
var Sequelize = require( 'sequelize' );

var sequelize = intiateSequelize( Sequelize );

//Set up Models
var Vendor = require( './models/Vendor.js' )( sequelize );
var Defense = require( './models/Defense.js' )( sequelize );
var Rate = require( './models/Rate.js' )( sequelize );
var User = require( './models/User.js' )( sequelize );
//Set up associations
// Will add VendorId to Rate
Defense.hasMany( Rate, {as: 'Rates'} );
// Will add VendorId to Defense
Vendor.hasMany( Defense, {as: 'Defenses'} );
Vendor.hasMany( Rate, {as: 'Rates'} );

//Sync databases
function sync () {
  sequelize.sync();
}

//Reset
function reset (fileName) {
  var data = loadData( fileName, 1 );
  clearAllTables( sequelize, insertData, data, sequelize, 
    Vendor, Defense, Rate );
}
//info: loads data
function loadData ( sheetFile, sheetNumber ) {
  sheetNumber = typeof sheetNumber === 'number' ? sheetNumber : 0;
  var XLSX = require( 'xlsx'  );
  var workbook = XLSX.readFile( sheetFile );
  return XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[sheetNumber]] );
}
//info: makes vendor object
function makeVendorObject ( object ) {
  var vendorObject =  {
    address: shorter( object[config.keys.address] ),
    city: shorter( object[config.keys.city] ),
    dateStatusChanged: shorter( object[config.keys.dateStatusChanged]  ),
    department: shorter( object[config.keys.department] ),
    email: shorter( object[config.keys.email] ),
    extension: shorter( object[config.keys.extension] ),
    firmName: shorter( object[config.keys.firmName] ),
    keyContact: shorter( object[config.keys.keyContact] ),
    name: shorter( object[config.keys.name] ),
    notes: shorter( object[config.keys.notes] ),
    phone:shorter( object[config.keys.phone] ),
    state: shorter( object[config.keys.state] ),
    stateRepresented: shorter( object[config.keys.stateRepresented] ),
    status: shorter( object[config.keys.status] ),
    statusChangedBy: shorter( object[config.keys.statusChangedBy] ),
    vendorNumber: shorter( object[config.keys.vendorNumber] ),
    vendorType: shorter( object[config.keys.vendorType] ),
    zip: shorter( object[config.keys.zip] ),
    zipPlusFour: shorter( object[config.keys.zipPlusFour] )
  }
  return vendorObject;
}
//info: makes defense objects
function makeDefenseObjects ( object, defenseTypes, vendor ) {
  var defenseObjects = [];
  for ( var i = 0 ; i < defenseTypes.length ; i++ ) {
    var defenseObject = {
      typeOfDefense: shorter( defenseTypes[i] ),
      VendorId: vendor.id
    }
    defenseObjects.push( defenseObject );
  }
  return defenseObjects;
}
//info: makes rate objects
function makeRateObjects ( object, rateTypes, defense ) {
  var rateObjects = [];
  for ( var i = 0 ; i < rateTypes.length ; i++ ) {
    var rateObject = {
      DefenseId: defense.id,
      rate: shorter( object[rateTypes[i]] ),
      rateApprovalDate: shorter( object[config.keys.rateApprovalDate] ),
      rateChangedBy:shorter( object[config.keys.rateChangedBy] ),
      rateType: shorter( rateTypes[i] ),
      rateTypeOfDefense: shorter( defense.typeOfDefense ),
      VendorId: defense.VendorId
    }
    rateObjects.push( rateObject );
  }
  return rateObjects; 
}
//info: removes whitespace
function shorter ( obj ) {
  if (typeof obj === 'undefined' ){
    return obj;
  }
  return obj.trim();
}
//info: finds defenses
function findAllDenfeseTypes ( obj ) {
  var defenses = config.enums.defenses;
  var objDefenses = [];
  for( var i = 0 ; i < defenses.length ; i++ ) {
    var def = defenses[i];
    if ( obj[def] ) {
      objDefenses.push( def );
    }
  }
  return objDefenses;
}
//info: finds rates
function findAllRateTypes ( obj ) {
  var rates = config.enums.rateTypes;
  var objRates = [];
  for( var i = 0 ; i < rates.length ; i++ ) {
    var def = rates[i];
    if ( obj[def] ) {
      objRates.push( def );
    }
  }
  return objRates;
}
//info: starts sequelize
function intiateSequelize ( Sequelize ) {
  var sequelize = new Sequelize( config.database.name,
    config.database.username, config.database.password, {
    host: config.database.host,
    dialect: config.database.dialect,
    logging: true,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });
  return sequelize;
}
//info: Inserts data into database
function insertData ( data, sequelize, Vendor, Defense, Rate ) {
  sequelize.sync().then( function() {
    //Load data into database
    for( var i = 0 ; i < data.length ; i ++ ){
      ( function( i ){  
        //Make Vendor Object
        Vendor.create( makeVendorObject( data[i] ) ).then( function( vendor ) {
          //Get all the defense and rate types that apply to the vendor
          var defenseTypes = findAllDenfeseTypes( data[i] );
          var rateTypes = findAllRateTypes( data[i] );

          Defense.bulkCreate( makeDefenseObjects( data[i], defenseTypes, vendor ) ).then( function() {
            //Create all corresponding rate types
            vendor.getDefenses().then( function ( defenses ) {
              for ( var k = 0 ; k < defenses.length ; k++ ){
                Rate.bulkCreate( makeRateObjects( data[i],rateTypes,defenses[k] ) );
              }
            });
          });
        });
      })( i );
    };
  });
}
//info: Clears table
function clearAllTables ( sequelize, callback, callbackParams ) {
  var callbackArgs = Array.prototype.splice.call( arguments, 2 );
  sequelize.query( 'SET FOREIGN_KEY_CHECKS = 0' )
    .then( function() {
        return sequelize
            .sync( {
                force: true
            });
    })
    .then( function() {
        return sequelize.query( 'SET FOREIGN_KEY_CHECKS = 1' )
    })
    .then( function() {
        callback.apply( null, callbackArgs );
    }, function( err ) {
        console.log( err );
    });
}

counsel.Vendor = Vendor;
counsel.Defense = Defense;
counsel.Rate = Rate;
counsel.User = User;
counsel.sequelize = sequelize;
counsel.rawData = data;

counsel.loadData = loadData;
counsel.makeVendorObject = makeVendorObject;
counsel.makeDefenseObjects = makeDefenseObjects;
counsel.makeRateObjects = makeRateObjects;
counsel.findAllDenfeseTypes = findAllDenfeseTypes;
counsel.findAllRateTypes = findAllRateTypes;
counsel.intiateSequelize = intiateSequelize;
counsel.insertData = insertData;
counsel.clearAllTables = clearAllTables;
counsel.sync = sync;
counsel.reset = reset;

module.exports = counsel;