var application = require("application");
var observable = require("data/observable");
var frameModule = require("ui/frame");
var pageData = new observable.Observable();
const DatePicker = require("tns-core-modules/ui/date-picker").DatePicker;
var StorageUtil = require("~/util/StorageUtil");
var gestures = require("ui/gestures");
var dialogs = require("ui/dialogs");

var page;
var pageData;
var currChoice;

exports.pageNavigating = function(args) {
	page = args.object;
	page.bindingContext = pageData;
	pageData.set("showTimePicker", false);

}


exports.selectPillTime = function(args) {
	pageData.set("showTimePicker", true);
}

exports.onPickerLoaded = function(args) {
	var timePicker = args.object;
	var previousTime = StorageUtil.getBirthControlTime();
	var prevHour = previousTime.getHours();
	var prevMins = previousTime.getMinutes();
	pageData.set("pillTime", prevHour + ":" + prevMins.toString());
	timePicker.hour = prevHour;
  timePicker.minute = prevMins;

    // handling 'time change' via code behind
    timePicker.on("timeChange", (result) => {
        const vm = page.bindingContext;
        vm.set("hourResult", `Hour: ${result.object.hour}`);
        vm.set("minuteResult", `Minute: ${result.object.minute}`);
        vm.set("timeResult", `TIme: ${result.object.time}`);
    });
}

exports.setTime = function(args) {
	var timePicker = page.getViewById("timePicker");
	pageData.set("pillTime", timePicker.hour + ":" + timePicker.minute.toString());
	var newTime = new Date();
	newTime.setHours(timePicker.hour);
	newTime.setMinutes(timePicker.minute);
	StorageUtil.setBirthControlTime(newTime);
	pageData.set("showTimePicker", false);
	frameModule.topmost().navigate('views/extendedView/extendedView');
}

function setPeriodLength() {
	var periodLengthField = page.getViewById("periodLength");
	var numDays = periodLengthField.text;
	StorageUtil.setPeriodLength(numDays);
}

exports.onFocus = function(args) {
	var textField = args.object;
	if (args.object === page.getViewById("periodStart")) {
		pageData.set('showDatePicker', true);
		textField.dismissSoftInput();
	}
}

xports.setPill= function(args) {
	var pillBtn = args.object;
	pillBtn.className = "buttonSelected";
	if (currChoice !== "Pill") {
		var noneBtn = page.getViewById("noneBtn");
		noneBtn.className = "buttonOption";
		currChoice = "Pill";
	}
	StorageUtil.setDoesUsePill(true);
	StorageUtil.setBirthControlType("Pill");
}

exports.setNone = function(args) {
	var noneBtn = args.object;
	noneBtn.className = "buttonSelected";
	if (currChoice !== "None") {
		var pillBtn = page.getViewById("pillBtn");
		pillBtn.className = "buttonOption";
		currChoice = "None";
	}
	StorageUtil.setDoesUsePill(false);
	StorageUtil.setBirthControlType("None");
}

exports.goToExtendedView = function() {
		frameModule.topmost().navigate('views/extendedView/extendedView');
}
