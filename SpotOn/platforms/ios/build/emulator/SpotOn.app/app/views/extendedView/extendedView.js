var application = require("application");
var observable = require("data/observable");
var pageData = new observable.Observable();
var StorageUtil = require("~/util/StorageUtil");
var InfoUtil = require("~/util/InfoUtil");
var frameModule = require("ui/frame");
var platform = require("platform")

var pageData;
var page;
var pageHeight = platform.screen.mainScreen.heightDIPs;

exports.pageLoaded = function(args) {
  
	page = args.object;
	page.bindingContext = pageData;

	var cycleDay = StorageUtil.getCycleDay();

	initExpectations(cycleDay);
	initRecommendations(cycleDay);
	initCalendar(cycleDay);
	initBirthControl();
	initQuote();
	initFormatting();

};


//Since page is a scroll view, cannot dynamically set height in CSS
function initFormatting() {
	var infoBox = page.getViewById("infoBox");
	infoBox.height = 0.4 * pageHeight;
	infoBox.marginTop = 0.1 * pageHeight;

	var stackPage = page.getViewById("stackPage");
	stackPage.height = 1.5 * pageHeight;

	var calendar = page.getViewById("calendar");
	calendar.height = 0.4 * pageHeight;
}


function initExpectations(cycleDay) {
	var expectations = InfoUtil.getExpectations(cycleDay);
	pageData.set("expectations", expectations);
}

function initRecommendations(cycleDay) {
	var recommendations = InfoUtil.getRecommendations(cycleDay);
	pageData.set("recommendations", recommendations);
}


function initCalendar(cycleDay) {
	var periodLength = StorageUtil.getPeriodLength();

}

function initBirthControl() {
	// var type = StorageUtil.getBirthControlType();
	var type = "Pill";
	var msg = "You are currently using the " + type + ".";

	// Countdown element
	if (type == "Pill") {
		msg += "\n Scheduled to be taken in: ";
		var countdownMins = StorageUtil.minsTillBirthControl();
		var bcTime;
		if (countdownMins <= 60) {
			bcTime = countdownMins + " mins"
		} else {
			var numHours = Math.floor(countdownMins/60);
			var numMins = countdownMins % 60;
			bcTime = numHours + " hrs " + numMins + " mins"
		}
		pageData.set("bcTime", bcTime);

	}

	pageData.set("bcText", msg);
}

function initQuote() {
	var fullquote = InfoUtil.getQuote();
	var author = "-" + fullquote.author + "-";
	pageData.set("quote", fullquote.quote);
	pageData.set("author", author);
}


exports.goToSettingsView = function() {
	frameModule.topmost().navigate('views/settingsView/settingsView');
}