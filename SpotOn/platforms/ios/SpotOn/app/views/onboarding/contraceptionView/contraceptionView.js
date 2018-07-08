var application = require("application");
var StorageUtil = require("~/util/StorageUtil");
var frameModule = require("ui/frame");

var page;
var currChoice;

exports.pageNavigating = function(args) {
	page = args.object;
}

exports.setPill= function(args) {
	var pillBtn = args.object;
	pillBtn.className = "buttonSelected";
	if (currChoice !== "Pill") {
		var noneBtn = page.getViewById("noneBtn");
		noneBtn.className = "buttonOption";
		currChoice = "Pill";
	}
}

exports.setNone = function(args) {
	var noneBtn = args.object;
	noneBtn.className = "buttonSelected";
	if (currChoice !== "None") {
		var pillBtn = page.getViewById("pillBtn");
		pillBtn.className = "buttonOption";
		currChoice = "None";
	}
}

exports.goToPeriodView = function() {
	if (currChoice == "Pill") {
		StorageUtil.setDoesUsePill(true);
		StorageUtil.setBirthControlType("Pill");
	} else if (currChoice == "None") {
		StorageUtil.setDoesUsePill(false);
		StorageUtil.setBirthControlType("None");
	} else {
		//Ensure that the user has filled out all fields
		dialogs.alert({
			title: "Not so fast!",
			message: "Please tap an option to continue",
			okButtonText: "Ok"
		}).then(function() {
			console.log("Dialog closed");
		});
	}
	frameModule.topmost().navigate('views/onboarding/periodView/periodView');
}
