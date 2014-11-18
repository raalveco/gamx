function DB() {}

var _parameters = {
	station: {
		"premium": "prices1",
		"diesel": "prices2",
		"magna": "prices3"
	},
	comment: {}
};

var _convertParameters = function(type, parameters){
	var newParameters = {};
	for(var param in parameters){
		newParameters[_parameters[type][param] || param] = parameters[param];
	}
	return newParameters;
};

DB.insertStation = function(parameters){
	var stations = DB.getAlloyCollection("stations");
	var station = DB.createAlloyModel('station', _convertParameters("station", parameters));
	stations.add(station);
	station.save();
};

DB.updateStation = function(stationId, parameters){
	var station =  Alloy.createModel('station');
	station.fetch({id: stationId});
	station.set(_convertParameters("station", parameters));
	station.save();
};

DB.deleteStation = function(stationId){
	var stations = DB.getAlloyCollection("stations");
	var station =  Alloy.createModel('station');
	station.fetch({id: stationId});
	station.destroy();
	stations.remove(station);
};

DB.insertComment = function(stationId, parameters){
	parameters.station = stationId;
	var comments = DB.getAlloyCollection("comments");
	var comment = DB.createAlloyModel('comment', _convertParameters("comment", parameters));
	comments.add(comment);
	comment.save();
};

DB.deleteComment = function(commentId){
	var comments = DB.getAlloyCollection("comments");
	var comment =  Alloy.createModel('comment');
	comment.fetch({id: commentId});
	comment.destroy();
	comments.remove(comment);
};

DB.getStationsByCityOrZip = function(value){
	var stations = DB.getAlloyCollection("stations");
	var where = "";
	// zip
	where += "postcode=? OR ";
	// municipality
	where += "municipality = ? OR ";
	where += "municipality like ? OR ";
	where += "municipality like ? OR ";
	where += "municipality like ?";
	
	var query = "SELECT * from stations WHERE " + where + " ORDER BY price1";
	Utils.Log.info("Query: " + query);
	stations.fetch({query: { statement: query, params: [value, value, "% " + value + " %", value + " %", "% " + value] }});
	var result = [];
	stations.each(function(c) {
		result.push(new Stations(
			c.get("id"),
			c.get("name"),
			c.get("description"),
			c.get("municipality"),
			c.get("neighborhood"),
			c.get("postcode"),
			c.get("state"),
			c.get("street"),
			c.get("town"),
			c.get("prices1"),
			c.get("prices2"),
			c.get("prices3"),
			c.get("prices4")
		));
	});
	return result;
};

DB.getAlloyCollection = function(collectionName){
	var results = Alloy.Collections[collectionName];
	return results;
};


DB.createAlloyModel = function(modelName, obj){
	var model = "";
	if(modelName == "config"){
		model = modelName;
	}else{
		if(DB.isTraining()){
			model = modelName + "_t";
		}else{
			model = modelName;
		}
	}
	return Alloy.createModel(model, obj);
};

module.exports = DB;