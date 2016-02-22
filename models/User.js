var Sequelize = require('sequelize');
var config = require('../config');
var bcrypt   = require('bcrypt-nodejs');
var User = {}

User.name = 'User';

User.attributes = {
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  typeOfUser: {
    type: Sequelize.ENUM,
    values: config.enums.userTypes
  },
  username: {
    type: Sequelize.STRING
  }
}

User.options = {
  classMethods: {
    //info: Returns a hashed version of the password
    //@@params:
    //  password: (string) The incoming password
    //@@returns: (string) An encrypted hash of the string
    generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }
  },
  instanceMethods: {
    //info: Checks if password is valid
    //@@params:
    //  password: (string) The incoming password
    //@@returns: (boolean) Whether or not the passwords match
    validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
    }
  }
}

module.exports = function ( sequelize ) { 
  return sequelize.define( User.name, User.attributes, User.options); 
};