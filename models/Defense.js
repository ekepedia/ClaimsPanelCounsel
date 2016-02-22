var Sequelize = require('sequelize');
var config = require('../config');
var Defense = {}

Defense.name = 'Defense';

Defense.attributes = {
  typeOfDefense: {
    type: Sequelize.ENUM,
    values: config.enums.defenses
  }
}

Defense.options = {
  
}

module.exports = function ( sequelize ) { 
  return sequelize.define( Defense.name, Defense.attributes, Defense.options); 
};