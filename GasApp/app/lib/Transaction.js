var Transaction = function(id, station, operation, parameters){
	this.id = id;
	this.station = station;
	this.operation = operation;
	this.parameters = parameters;
};

Transaction.prototype.process = function(){
	Utils.Log.info("Processing transaction " + JSON.stringify(this));
	switch (this.operation){
		case "INSERT":
			DB.insertStation(this.parameters);
			break;
		case "UPDATE":
			DB.updateStation(this.station, this.parameters);
			break;
		case "DELETE":
			DB.deleteStation(this.station);
			break;
		case "COMMENT":
			DB.insertComment(this.station, this.parameters);
			break;
		case "DELETECOMMENT":
			DB.deleteComment(this.station);
			break;
		default:
			Utils.Log.error("Unknown transaction operation");
			break;
	}
	return true;
};

module.exports = Transaction;