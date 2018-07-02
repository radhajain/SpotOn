var application = require("application");
var StorageUtil = require("~/util/StorageUtil");
var frameModule = require("ui/frame");

var page;

exports.pageNavigating = function(args) {
	page = args.object;
	//___TEMP____
	//___TEMP___

}

exports.goToHomeView = function() {
	frameModule.topmost().navigate('views/homeView/homeView');
}

exports.setDate = function() {
  // temp
  var today = new Date();
	StorageUtil.setFirstCycleDay(today);
}
