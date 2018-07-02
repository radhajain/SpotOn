var application = require("application");
var StorageUtil = require("~/util/StorageUtil");
var frameModule = require("ui/frame");

var page;

exports.pageNavigating = function(args) {
	page = args.object;
	//___TEMP____

	//___TEMP___

}

exports.goToContraceptionView = function() {
	frameModule.topmost().navigate('views/onboarding/contraceptionView/contraceptionView');
}
