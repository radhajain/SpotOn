var application = require("application");
var observable = require("data/observable");
var pageData = new observable.Observable();
var StorageUtil = require("~/util/StorageUtil");



exports.pageLoaded = function(args) {
  
	page = args.object;
	page.bindingContext = pageData;
	var name = StorageUtil.getName();
	var greeting = "Good Morning, " + name + ".";
	pageData.set("greeting", greeting);
};