var application = require("application");



exports.pageLoaded = function(args) {
  
	page = args.object;
	page.bindingContext = pageData;
	var greeting = "Good Morning Radha";
	pageData.set("greeting", greeting);
};