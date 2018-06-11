var application = require("application");
var observable = require("data/observable");
var pageData = new observable.Observable();
var StorageUtil = require("~/util/StorageUtil");
var InfoUtil = require("~/util/InfoUtil");
var frameModule = require("ui/frame");
var platform = require("platform");
var Label = require("ui/label").Label;
var layout = require("ui/layouts/grid-layout");
var [GridLayout, GridUnitType, ItemSpec] = [layout.GridLayout, layout.GridUnitType, layout.ItemSpec];

var pageData;
var page;
var pageHeight;
var calendar;
var DAYS = ["M", "Tu", "W", "Th", "F", "S", "S"];
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var currDate;
var cycleDay;

exports.pageLoaded = function(args) {
	page = args.object;
	page.bindingContext = pageData;
	pageHeight = platform.screen.mainScreen.heightDIPs;
	cycleDay = StorageUtil.getCycleDay();
	calendar = page.getViewById("calendar");
	initExpectations();
	initRecommendations();
	initCalendar();
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
	
}


function initExpectations() {
	var expectations = InfoUtil.getExpectations(cycleDay);
	pageData.set("expectations", expectations);
}

function initRecommendations() {
	var recommendations = InfoUtil.getRecommendations(cycleDay);
	pageData.set("recommendations", recommendations);
}

//Set's up the static aspects of the calendar (e.g. Weekday Labels and arrows)
function initCalendar() {
	calendar = page.getViewById("calendar");
	calendar.height = 0.4 * pageHeight;
	var today = new Date();
	initDayLabels();
	renderCalendar(today);
}

//Column headers (e.g. Monday, Tuesday....)
function initDayLabels() {
	for (var i = 0; i < 7; i++) {
		var dayCell = new Label();
		dayCell.text = DAYS[i];
		dayCell.class="dayHeaders";
		calendar.addChild(dayCell);
		GridLayout.setRow(dayCell, 1);
		GridLayout.setColumn(dayCell, i);
	}
}


//Sets up the dynamic aspects of calendar (dates, month labels). Recalled by prender prev/next month
function renderCalendar(date) {
	currDate = date;
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	initMonthTitle(monthIndex, year);
	initDates(monthIndex, year);
}

//Month label
function initMonthTitle(monthIndex, year) {
	var monthTitle = new Label();
	monthTitle.text = MONTHS[monthIndex] + ", '" + year.toString().substr(-2);
	monthTitle.class = "monthTitle";
	calendar.addChild(monthTitle);
	GridLayout.setRow(monthTitle, 0);
	GridLayout.setColumn(monthTitle, 1);
	GridLayout.setColumnSpan(monthTitle, 5);
}


//Adds dates to the calendar, tracking today's date and the date of the last period
function initDates(monthIndex, year) {
	var periodLength = parseInt(StorageUtil.getPeriodLength(), 10);
	var periodStartDate = new Date();
	periodStartDate.setDate(periodStartDate.getDate() - (cycleDay - 1));
	var periodEndDate = addDays(periodStartDate, periodLength);
	// ---*****Need to log period dates for every month (28-day cycle)***-----

	var monthDay = new Date(year, monthIndex, 1); //The first of the month
	var dateOfFirst = monthDay.getDay(); //e.g. 3 = Wednesday 
	var offset = 1-(dateOfFirst-1); //Number of days to show prior to the 1st
	var numWeeks;

	if (dateOfFirst === 0) { //if the first falls on a sunday, then include the previous week
		numWeeks = Math.ceil((dateOfFirst + 7 - 1 + daysInMonth(monthIndex + 1, year)) / 7) ;
		monthDay.setDate(offset - 7);
	} else { 
		numWeeks = Math.ceil((dateOfFirst - 1 + daysInMonth(monthIndex + 1, year)) / 7);
		monthDay.setDate(offset);	
	}
	var today = new Date();

	for (var week = 2; week < 2 + numWeeks; week++) {
	 	var row = week;
	 	for (var i = 0; i < 7; i++) {
			var dayCell = new Label();
			dayCell.text = monthDay.getDate();
			calendar.addChild(dayCell);
			GridLayout.setRow(dayCell, row);
			GridLayout.setColumn(dayCell, i);
			if (monthDay.getMonth() !== monthIndex) {
	 			dayCell.class = "cell inactive"; //if in the previous/next month, set to inactive.
	 		} else {
	 			dayCell.class = "cell active";
	 			if (dateBetween(periodStartDate, periodEndDate, monthDay)) {
	 				dayCell.class = "cell active period"; //period
	 			}
	 			if (dateEquals(monthDay, today)) {
	 				if (dateBetween(periodStartDate, periodEndDate, monthDay)) {
	 					dayCell.class = "cell active circle period"; //today and period
	 				} else {
	 					dayCell.class = "cell active circle"; //today
	 				}
	 			}
	 		}
	 		monthDay.setDate(monthDay.getDate() + 1);
	 	}
	 }
}

//Left arrow
exports.renderPrevMonth = function() {
	var monthIndex = currDate.getMonth()
	currDate.setMonth(monthIndex-1);
	clearCalendar();
	renderCalendar(currDate);
}

//Right arrow
exports.renderNextMonth = function() {
	var monthIndex = currDate.getMonth()
	currDate.setMonth(monthIndex+1);
	clearCalendar();
	renderCalendar(currDate);
}




/*****************************/
/* CALENDAR HELPER FUNCTIONS */
/*****************************/

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}


function dateEquals(firstDate, secondDate) {
	if (firstDate.getFullYear() == secondDate.getFullYear() && firstDate.getMonth() == secondDate.getMonth() && firstDate.getDate() == secondDate.getDate()) {
		return true;
	} else {
		return false;
	}
}
 
function dateBetween(first, second, between) {
	if (first <= between && between <= second) {
		return true;
	}
	return false;
}

function clearCalendar() {
	console.log("Cleeaing calendar");
	var clearMonth = new Label();
	clearMonth.text = "";
	clearMonth.class = "erase";
	calendar.addChild(clearMonth);
	GridLayout.setRow(clearMonth, 0);
	GridLayout.setColumn(clearMonth, 1);
	GridLayout.setColumnSpan(clearMonth, 5);

	for (var row = 2; row < 8; row++) {
		for (var col = 0; col < 7; col++) {
			var clearCell = new Label();
			clearCell.text = "";
			clearCell.class = "erase";
			calendar.addChild(clearCell);
			GridLayout.setRow(clearCell, row);
			GridLayout.setColumn(clearCell, col);
		}
	}
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