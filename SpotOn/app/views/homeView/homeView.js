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
	pageData.set("showWarning", false);
	pageData.set("secondWarning", false);
	initGreeting();
	var cycleDay = StorageUtil.getCycleDay();
	initMessage(cycleDay);
	exports.showWarning();
	var observer = page.observe(gestures.GestureTypes.swipe, function (args) {
        //If swipe down on the screen, go to extended page
        if (args.direction == 4) {
        	frameModule.topmost().navigate({
        		moduleName: 'views/extendedView/extendedView',
        		animated: true,
        		transition: {
        			name: "slideTop",
        			duration: 450,
        			curve: "easeIn"
        		}
        	});
        }
    });

};

exports.showWarning = function() {
	var minsTillPill = StorageUtil.minsTillBirthControl();
	if (minsTillPill < 60) {
		pageData.set("showWarning", true);
		var time = "3PM"; //TEMP
		var msg = "Your pill is scheduled for " + time + ". \n Did you take your pill?";
		pageData.set("pillReminder", msg);
	}
}

exports.dismiss = function() {
	//record pill taken
	// dismissedWarning = true; -> new one every 24 hours, stored in storageUtil
	pageData.set("showWarning", false);
}

exports.continueAlert = function() {
	pageData.set("pillReminder", "You should take your pill as soon as possible");
	pageData.set("secondWarning", true);

}


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
	frameModule.topmost().navigate({
		moduleName: 'views/extendedView/extendedView',
		animated: true,
		transition: {
			name: "slideTop",
			duration: 450,
			curve: "easeIn"
		}
	});
}