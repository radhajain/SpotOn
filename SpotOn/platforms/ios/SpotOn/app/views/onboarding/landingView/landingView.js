var application = require("application");
var observable = require("data/observable");
var frameModule = require("ui/frame");
var pageData = new observable.Observable();
const DatePicker = require("tns-core-modules/ui/date-picker").DatePicker;
var StorageUtil = require("~/util/StorageUtil");
var gestures = require("ui/gestures");

var page;

exports.pageNavigating = function(args) {
	page = args.object;

}

exports.addName = function() {
	var nameField = page.getViewById("name");
	var name = nameField.text;
	if (name !== "") {
		StorageUtil.setName(name.trim());
	}
}

exports.addPeriodStartDay = function() {
	var nameField = page.getViewById("periodStart");
	var date = nameField.text;
	if (date !== "") {
		StorageUtil.setFirstCycleDay(date);
	}
}

exports.onFocus = function(args) {
	console.log("focusing");
	var textField = args.object;
	var observer = page.observe(gestures.GestureTypes.tap, function (args) {
        textField.dismissSoftInput();
    });
}

function onBlur(args) {
	var textField = args.object;
	textField.dismissSoftInput();
	console.log("blurring");
}


exports.goToContraceptionView = function() {
	frameModule.topmost().navigate('views/onboarding/contraceptionView/contraceptionView');
}