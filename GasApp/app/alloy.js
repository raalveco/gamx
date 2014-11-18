// Libraries 1
var Globals = require('Globals');

// Collections
//		configuration	(this doesn't have training version because configuration is global shared)
Alloy.Collections.config = Alloy.createCollection('config');
Alloy.Collections.config.fetch();
//		stations
Alloy.Collections.stations = Alloy.createCollection('stations');
Alloy.Collections.stations.fetch();
//		comments
Alloy.Collections.comments = Alloy.createCollection('comments');
Alloy.Collections.comments.fetch();

// Classes
var Station = require('Station');
var Transaction = require('Transaction');

// Libraries 2
var Utils = require('Utils');
var DB = require('DB');

// Libraries 3
var Config = require('Config');
var Constants = require('Constants');
var Sync = require('Sync');
var WebService = require('WebService');

Globals.set("sync", "baseUrl", "http://gasapp.mx/api/v1/");
Globals.set("sync", "sendingData", false);
Globals.set("sync", "connectivity", Constants.ConnectivityStatus.UNKNOWN);
Globals.set("window", "currentTitle", "");
Globals.set("window", "currentWindow", null);
Globals.set("window", "currentControllerName", "");

