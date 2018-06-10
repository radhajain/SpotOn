var appSettings = require("application-settings");


var DAY_IN_MS = 86400000;



/* export: getCycleDay
 * ----------------
 * Gets the user's day in their cycle
 */
exports.getCycleDay = function() {
	var today = Date.now();
	var firstDay = JSON.parse(appSettings.getString('firstDay'));
	var sinceFirstDay = Math.round(Math.abs((today.getTime() - firstDay.getTime())/DAY_IN_MS));
	return sinceFirstDay % 28;
}



/* export: getCycleDay
 * ----------------
 * Sets the user's first day in their cycle
 */
exports.setFirstCycleDay = function(date) {
	appSettings.setString('firstDay', JSON.stringify(date));
};

/* export: getCycleDay
 * ----------------
 * Returns the user's first day in their cycle
 */
exports.getFirstCycleDay = function(date) {
	return JSON.parse(appSettings.getString('firstDay'));
};

/* export: setPeriodLength
 * ----------------
 * Sets the user's usual period length
 */
exports.setPeriodLength = function(numDays) {
	appSettings.setString('periodLength', JSON.stringify(numDays));
};

/* export: getPeriodLength
 * ----------------
 * Returns the length of a users period (number)
 */
exports.getPeriodLength = function(numDays) {
	return JSON.parse(appSettings.getString('periodLength'));
};



/* export: setName
 * ---------------
 * Sets the user's name in memory
 */
exports.setName = function(newName) {
  appSettings.setString('name', newName);
};

/* export: getName
 * ---------------
 * Retrieves the user's name
 */
exports.getName = function() {
  return appSettings.getString('name');
};


/* export: isOnboardingComplete
 * ---------------
 * Checks if the user has finished in-app onboarding yet
 */
exports.isOnboardingComplete = function() {
  return appSettings.getBoolean('onboardingComplete');
};

/* export: setOnboardingComplete
 * ----------------
 * Sets the boolean 'onboardingComplete' to true which means the user doesn't need to go through pre-app
 * onboarding anymore.
 */
exports.setOnboardingComplete = function() {
  appSettings.setBoolean('onboardingComplete', true);
};


