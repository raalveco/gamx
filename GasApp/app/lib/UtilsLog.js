var Log = {};

Log.trace = function(message){
	Ti.API.trace("GASAPP: " + message);
};

Log.info = function(message){
	Ti.API.info("GASAPP: " + message);
};

Log.warn = function(message){
	Ti.API.warn("GASAPP: " + message);
};

Log.error = function(message){
	Ti.API.error("GASAPP: " + message);
};

module.exports = Log;