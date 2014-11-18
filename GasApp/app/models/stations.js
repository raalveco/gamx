exports.definition = {
    config: {
        adapter: {
			"type": "sql",
			"collection_name": "stations",
			"db_file": "/stations.db",
			"db_name": "stations",
			"idAttribute": "id",
			"remoteBackup": false
		}
    }
};