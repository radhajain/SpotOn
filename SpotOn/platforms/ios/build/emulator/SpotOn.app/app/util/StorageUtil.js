var appSettings = require("application-settings");


exports.setName = function(newName) {
  appSettings.setString('name', newName);
};

exports.getName = function() {
  return appSettings.getString('name');
};