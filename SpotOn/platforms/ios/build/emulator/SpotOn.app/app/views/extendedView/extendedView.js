var application = require("application");
var observable = require("data/observable");
var pageData = new observable.Observable();
var StorageUtil = require("~/util/StorageUtil");
var InfoUtil = require("~/util/InfoUtil");
var frameModule = require("ui/frame");
var calendarModule = require("nativescript-telerik-ui-pro/calendar");

var pageData;
var page;

exports.pageLoaded = function(args) {
  
	page = args.object;
	page.bindingContext = pageData;

	var cycleDay = StorageUtil.getCycleDay();

	initExpectations(cycleDay);
	initRecommendations(cycleDay);

};

function initExpectations(cycleDay) {
	var expectations = InfoUtil.getExpectations(cycleDay);
	pageData.set("expectations", expectations);
}

function initRecommendations(cycleDay) {
	var recommendations = InfoUtil.getRecommendations(cycleDay);
	pageData.set("recommendations", recommendations);
}
