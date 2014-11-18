function Globals() {}

var vars = {};

Globals.set = function(category, key, value) {
	vars[category + "__" + key] = value;
};

Globals.get = function(category, key) {
	return vars[category + "__" + key];
};

module.exports = Globals;