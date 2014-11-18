function Sync() {}

// how often communication with server occurs
var delay = 60 * 1000;
var delayInterval = 0;
var maxPushLength;

function failedConnection(){
	Globals.set("sync", "connectivity", Constants.ConnectivityStatus.ERROR);
}

// method called when each interval occurs
var send = function(){
	Utils.Log.info("Syncing...");
	// if still connecting, cancel interval
	if(Globals.get("sync", "sendingData") == true){
		Utils.Log.info("Previous syncing in process, postponing...");
		return;
	}
	Globals.set("sync", "sendingData", true);
	// check connectivity
	if(!Utils.Nav.isConnected()){
		Globals.set("sync", "sendingData", false);
		failedConnection();
		Utils.Log.info("No network connection detected.");
		return;
	}
	
	Globals.set("sync", "connectivity", Constants.ConnectivityStatus.CONNECTING);
	WebService.getTransactions(Config.get(Config.LASTTRANSACTIONSEEN), function(result) {
		Globals.set("sync", "sendingData", false);
		Utils.Log.trace("get transactions callback");
		
		if(result && result.ok){
			Utils.Log.trace("get transactions callback ok");
			if(result.transactions){
				Utils.Log.trace("get transactions callback w transactions");
				Utils.Log.info("Incoming transactions from server: " + result.transactions.length);
				for(var i = 0; i < result.transactions.length; i++){
					var transaction = result.transactions[i];
					var parameters = {};
					for(var prop in transaction){
						if(["id", "station", "operation"].indexOf(prop) == -1){
							parameters[prop] = transaction[prop];
						}
					}
					var transactionObj = new Transaction(transaction.id, transaction.station, transaction.operation, parameters);
					transactionObj.process();
				}
				Config.set(Config.LASTTRANSACTIONSEEN, result.lastTransaction);
				// Check if found transactions. If so, call again because they are limited and there may be more transactions
				if(result.transactions.length > 0){
					// delay 5 seconds so that device doesn't hang up
					setTimeout(send, 5 * 1000);
				}else{
					Globals.set("sync", "connectivity", Constants.ConnectivityStatus.UPTODATE);
				}
			}
		}else{
			failedConnection();
		}
	});
};

// starts sync'ing
Sync.start = function() {
	Utils.Log.info("Sync started every " + delay + "ms");
	clearInterval(delayInterval);
	send();
	delayInterval = setInterval(send, delay);
};

// re-starts sync'ing
Sync.restart = function() {
	Utils.Log.info("Sync restarted every " + delay);
	clearInterval(delayInterval);
	delayInterval = setInterval(send, delay);
};

// stops sync'ing
Sync.stop = function() {
	Utils.Log.info("Sync stopped");
	clearInterval(delayInterval);
};

module.exports = Sync;