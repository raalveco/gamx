function WebService() {}

WebService.getTransactions = function(lastTransactionSeen, callback) {
	// Sample: http://gasapp.mx/api/v1/getTransactions?lastTransaction=9
	
	var request = Titanium.Network.createHTTPClient();
	var url = Globals.get("sync", "baseUrl") + "getTransactions?lastTransaction=" + (lastTransactionSeen || 0);
	Utils.Log.info("Sending url " + url);
	request.open("GET", url);
	
	// if response is correct and parameter ok is set to true, then call callback with response text,
	// otherwise call callback without parameter
	request.onload = function(e){
		var obj = null;
		var response = null;
		Utils.Log.info("Get transactions responded");
		try{
			response = this.responseText;
			obj = JSON.parse(response);
		}catch(ex){
			Utils.Log.error("Failed to parse reponse: " + e.message + ". Response: " + response);
		}
		if(obj && obj.ok == true){
			setTimeout(function(){
				callback(obj);
				obj = null;
			}, 1);
		}else{
			obj = null;
			setTimeout(function(){
				callback();
			}, 1);
		}
		Utils.Log.info("Web Service call succedded");
	};
	request.onerror = function(e){
		setTimeout(function(){
			callback();
		}, 1);
		Utils.Log.error("Command Error: " + e.error);
	};
	
	request.setRequestHeader('Connection', 'Keep-Alive');
	request.send();
	Utils.Log.info("Get transactions ws call sent");
};

module.exports = WebService;