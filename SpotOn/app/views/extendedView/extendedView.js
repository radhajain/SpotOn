var application = require("application");
var observable = require("data/observable");
var pageData = new observable.Observable();
var StorageUtil = require("~/util/StorageUtil");
var InfoUtil = require("~/util/InfoUtil");
var frameModule = require("ui/frame");

var pageData;
var page;

exports.pageLoaded = function(args) {
  
	page = args.object;
	page.bindingContext = pageData;

	var cycleDay = StorageUtil.getCycleDay();

	initExpectations(cycleDay);
	initRecommendations(cycleDay);
	initCalendar(cycleDay);

};

function initExpectations(cycleDay) {
	var expectations = InfoUtil.getExpectations(cycleDay);
	pageData.set("expectations", expectations);
}

function initRecommendations(cycleDay) {
	var recommendations = InfoUtil.getRecommendations(cycleDay);
	console.log(recommendations);
	pageData.set("recommendations", recommendations);
}


function initCalendar(cycleDay) {
	var periodLength = StorageUtil.getPeriodLength();

}

exports.goToSettingsView = function() {
	frameModule.topmost().navigate('views/settingsView/settingsView');
}