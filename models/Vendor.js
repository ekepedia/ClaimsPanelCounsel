//Contains the Vendor model used by the database
var Sequelize = require('sequelize');
var config = require('../config');
var Vendor = {};

Vendor.name = 'Vendor';

Vendor.attributes = {
  address: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  dateStatusChanged: {
    type: Sequelize.DATE
  },
  department: {
    type: Sequelize.ENUM,
    values: config.enums.departments,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  extension: {
    type: Sequelize.STRING,
  },
  firmName: {
    type: Sequelize.STRING,
  },
  keyContact: {
    type: Sequelize.BOOLEAN
  },
  name: {
    type: Sequelize.STRING,
  },
  notes: {
    type: Sequelize.TEXT
  },
  phone: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.ENUM,
    values: config.enums.states,
  },
  stateRepresented: {
    type: Sequelize.ENUM,
    values: config.enums.states,
  },
  status: {
    type: Sequelize.ENUM,
    values: config.enums.statuses
  },
  statusChangedBy: {
    type: Sequelize.STRING
  },
  vendorNumber: {
    type: Sequelize.STRING,
  },
  vendorType: {
    type: Sequelize.ENUM,
    values: config.enums.vendors,
    defaultValue: 'Attorney'
  },
  zip: {
    type: Sequelize.STRING,
  },
  zipPlusFour: {
    type: Sequelize.STRING,
  }
}

Vendor.options = {
    
}

module.exports = function ( sequelize ) { 
  return sequelize.define( Vendor.name, Vendor.attributes, Vendor.options); 
};