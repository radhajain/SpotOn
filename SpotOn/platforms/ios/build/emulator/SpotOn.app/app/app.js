/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

require("./bundle-config");
var application = require("application");
var StorageUtil = require('~/util/StorageUtil');

var firebase = require("nativescript-plugin-firebase");
//require('firebase/database');


firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
    function (instance) {
      console.log("firebase.init done");
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);


		/*firebase.push(
      '/users',
      {
        'first': 'Eddy',
        'last': 'Verbruggen',
        'birthYear': 1977,
        'isMale': true,
        'address': {
          'street': 'foostreet',
          'number': 123
        }
      }
  ).then(
      function (result) {
        console.log("created key: " + result.key);
      }
  );*/

// application.start({ moduleName: "views/homeView/homeView" });

if (StorageUtil.isOnboardingComplete()) {
	application.start({ moduleName: "views/homeView/homeView" });
} else {
	application.start({ moduleName: "views/onboarding/landingView/landingView" });
}

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
