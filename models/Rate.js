var Sequelize = require('sequelize');
var config = require('../config');
var Rate = {}

Rate.name = 'Rate';

Rate.attributes = {
  rate: {
    type: Sequelize.STRING,
  },
  rateApprovalDate: {
    type: Sequelize.DATE
  },
  rateChangedBy: {
    type: Sequelize.STRING
  },
  rateType: {
    type: Sequelize.ENUM,
    values: config.enums.rateTypes
  },
  rateTypeOfDefense: {
    type: Sequelize.ENUM,
    values: config.enums.defenses
  }
}

Rate.options = {
  
}

module.exports = function ( sequelize ) { 
  return sequelize.define( Rate.name, Rate.attributes, Rate.options); 
};