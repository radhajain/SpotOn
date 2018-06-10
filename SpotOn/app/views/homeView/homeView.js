var application = require("application");
var observable = require("data/observable");
var pageData = new observable.Observable();
var StorageUtil = require("~/util/StorageUtil");
var InfoUtil = require("~/util/InfoUtil");
var frameModule = require("ui/frame");
var gestures = require("ui/gestures");


var pageData;
var page;

exports.pageLoaded = function(args) {
  
	page = args.object;
	page.bindingContext = pageData;
	initGreeting();
	var cycleDay = StorageUtil.getCycleDay();
	initMessage(cycleDay);
	var observer = page.observe(gestures.GestureTypes.swipe, function (args) {
        //If swipe up on the screen, go to extended page
        if (args.direction == 4) {
        	frameModule.topmost().navigate('views/extendedView/extendedView');
        }
    });

};

// E.g. Good Morning, Genivieve, where intro = "Good Morning, "
function initGreeting() {
	var intro = StorageUtil.getGreeting();
	var name = StorageUtil.getName();
	var greeting = intro + name + ".";
	pageData.set("greeting", greeting);
}

// Daily tips and recommendations preview
function initMessage(cycleDay) {
	var message = InfoUtil.getMessage(cycleDay);
	pageData.set("message", message);
}

//If tap on the arrow, go to extended page
exports.goToExtendedView = function() {
	frameModule.topmost().navigate('views/extendedView/extendedView');
}