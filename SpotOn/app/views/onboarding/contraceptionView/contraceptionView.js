var application = require("application");
var StorageUtil = require("~/util/StorageUtil");
var frameModule = require("ui/frame");

var page;

exports.pageNavigating = function(args) {
	page = args.object;

}

exports.goToHomeView = function() {
	frameModule.topmost().navigate('views/homeView/homeView');
}