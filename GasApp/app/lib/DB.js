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

var executeQuery = function(db, query, params){
	var dbo = Ti.Database.open("/" + db + ".db");
	var values = [query];
	if(params){
		for (var i=0; i < params.length; i++) {
			values.push(params[i]);
		};
	}
	Utils.Log.info("DB Query: " + values.join(", "));
	var results = dbo.execute.apply(dbo, values);
	dbo.close();
	return results;
};

DB.getStationsByCityOrZip = function(value, page){
	if(!page) page = 1;
	var stations = DB.getAlloyCollection("stations");
	var where = "postcode=? OR municipality like ?";
	var table = stations.config.adapter.collection_name;
	var query = "SELECT * from " + table + " WHERE " + where + " ORDER BY prices1 limit " + ((page - 1) * 20 + 1) + ",20";
	stations.fetch({query: { statement: query, params: [value, "%" + value + "%"] }});
	var result = [];
	stations.each(function(c) {
		result.push(new Station(
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