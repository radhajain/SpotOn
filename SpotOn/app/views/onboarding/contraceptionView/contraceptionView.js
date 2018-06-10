var application = require("application");
var StorageUtil = require("~/util/StorageUtil");
var frameModule = require("ui/frame");

var page;

exports.pageNavigating = function(args) {
	page = args.object;
	//___TEMP____
	StorageUtil.setBirthControlType("Pill");
	//___TEMP___

}

exports.goToHomeView = function() {
	frameModule.topmost().navigate('views/homeView/homeView');
}