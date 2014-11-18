// Stores device config data

function Config() {}

Config.LASTTRANSACTIONSEEN = "lastTransactionSeen";

var _config = Alloy.Collections.config;
_config.fetch();

Config.set = function(key, value) {
	var model = DB.createAlloyModel('config', {
		key: key,
		value: value
	});
	_config.add(model);
	model.save();
	_config.fetch();
};

Config.clear = function(key) {
	_config.fetch();
	for (var i = _config.length - 1; i >= 0; i--) {
		var model = _config.at(i);
	    if(model.get("key") == key){
	    	model.destroy();
	    	_config.remove(model);
	    }
	}
	_config.fetch();
};

Config.get = function(key) {
	var result = null;
	_config.fetch();
	_config.each(function(c) {
		if(c.get("key") == key){
			result = c.get("value");
		}
	});
	return result;
};

Config.clearAll = function() {
	_config.fetch();
	for (var i = _config.length - 1; i >= 0; i--) {
		var model = _config.at(i);
		if(_permanent.indexOf(model.get("key")) == -1){
		    model.destroy();
		    _config.remove(model);
		}
	}
	_config.fetch();
};


module.exports = Config;