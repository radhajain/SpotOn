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
	initName();
	initPeriodLength();
	initContraception();
	initPeriodOptions();
}

/*********************
INITIATION FUNCTIONS*
*********************/

function initName() {
	var name = StorageUtil.getName();
	pageData.set("name", name);
}

function initPeriodLength() {
	var periodLength = StorageUtil.getPeriodLength();
	pageData.set("periodLength", periodLength);
}

function initContraception() {
	var contraceptionChoice = StorageUtil.getBirthControlType();
	page.getViewById(contraceptionChoice).className = 'buttonSelected';
}

function initPeriodOptions() {
	var doesGetPeriod = StorageUtil.getDoesGetPeriod();
	if (doesGetPeriod) {
		page.getViewById("Yes").className = 'buttonSelected';
	} else {
		page.getViewById("No").className = 'buttonSelected';
	}
}


/********************
   USER INTERACTIONS
*********************/

exports.selectPillTime = function(args) {
	pageData.set("showTimePicker", true);
}

exports.onPickerLoaded = function(args) {
	//Auto load picker to the current stored birth control time
	var timePicker = args.object;
	var previousTime = StorageUtil.getBirthControlTime();
	var prevHour = previousTime.getHours();
	var prevMins = previousTime.getMinutes();
	pageData.set("pillTime", prevHour + ":" + prevMins.toString());
	timePicker.hour = prevHour;
  	timePicker.minute = prevMins;
}

exports.setTime = function(args) {
	var timePicker = page.getViewById("timePicker");
	pageData.set("pillTime", timePicker.hour + ":" + timePicker.minute.toString());
	var newTime = new Date();
	newTime.setHours(timePicker.hour);
	newTime.setMinutes(timePicker.minute);
	StorageUtil.setBirthControlTime(newTime);
	pageData.set("showTimePicker", false);
}


/*********************
SET WHETHER GETS PERIOD*
*********************/


exports.setPeriod = function() {
	var settingsGetsPeriod = StorageUtil.getDoesGetPeriod();
	if (!settingsGetsPeriod) {
		StorageUtil.setDoesGetPeriod(true);
	}
	clearSelected();
	page.getViewById("Yes").className="buttonSelected";
}


exports.setNoPeriod = function() {
	var settingsGetsPeriod = StorageUtil.getDoesGetPeriod();
	if (settingsGetsPeriod) {
		StorageUtil.setDoesGetPeriod(false);
	}
	clearSelected();
	page.getViewById("No").className="buttonSelected";
}


function clearSelected() {
	page.getViewById("Yes").className="buttonOption";
	page.getViewById("No").className="buttonOption";

}


/*********************
CONTRACEPTION CHOICES*
*********************/


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


function clearBtnClasses() {
	var pillBtn = page.getViewById("Pill");
	pillBtn.className = "buttonOption";
	var noneBtn = page.getViewById("None");
	noneBtn.className = "buttonOption";
	var otherBtn = page.getViewById("Other");
	otherBtn.className = "buttonOption";
}


/*********************
UPDATE & SAVE CHANGES*
*********************/

exports.updateName = function() {
	var settingsName = StorageUtil.getName();
	var enteredName = page.getViewById("name").text;
	if (settingsName != enteredName) {
		StorageUtil.setName(enteredName);
	}
}

exports.updatePeriodLength = function() {
	var settingsPdLength = StorageUtil.getPeriodLength();
	var enteredPdLength = page.getViewById("periodLength").text;
	if (settingsPdLength != enteredPdLength) {
		StorageUtil.setPeriodLength(enteredPdLength);
	}
}



exports.goToExtendedView = function() {
	exports.updateName();
	exports.updatePeriodLength();


	frameModule.topmost().navigate('views/extendedView/extendedView');
}
