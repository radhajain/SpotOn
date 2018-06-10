var application = require("application");
var observable = require("data/observable");
var pageData = new observable.Observable();
var StorageUtil = require("~/util/StorageUtil");



exports.pageLoaded = function(args) {
  
	page = args.object;
	page.bindingContext = pageData;
	var intro = StorageUtil.getGreeting();
	var name = StorageUtil.getName();
	var greeting = intro + name + ".";
	pageData.set("greeting", greeting);
};