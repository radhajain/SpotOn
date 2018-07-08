var application = require("application");
var StorageUtil = require("~/util/StorageUtil");
var frameModule = require("ui/frame");

var page;
var currChoice;

exports.pageNavigating = function(args) {
	page = args.object;
}

exports.setPill= function(args) {
	clearBtnClasses();
	var pillBtn = args.object;
	pillBtn.className = "buttonSelected";
	currChoice = "Pill";
}

exports.setNone = function(args) {
	clearBtnClasses();
	var noneBtn = args.object;
	noneBtn.className = "buttonSelected";
	currChoice = "None";
}

exports.setOther = function(args) {
	clearBtnClasses();
	var otherBtn = args.object;
	otherBtn.className = "buttonSelected";
	currChoice = "Other";
}


exports.goToPeriodView = function() {
	if (currChoice == "Pill") {
		StorageUtil.setDoesUsePill(true);
		StorageUtil.setBirthControlType("Pill");
	} else if (currChoice == "None") {
		StorageUtil.setDoesUsePill(false);
		StorageUtil.setBirthControlType("None");
	} else if (currChoice == "Other") {
		StorageUtil.setDoesUsePill(false);
		StorageUtil.setBirthControlType("Other");
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

function clearBtnClasses() {
	var pillBtn = page.getViewById("pillBtn");
	pillBtn.className = "buttonOption";
	var noneBtn = page.getViewById("noneBtn");
	noneBtn.className = "buttonOption";
	var otherBtn = page.getViewById("otherBtn");
	otherBtn.className = "buttonOption";
}
