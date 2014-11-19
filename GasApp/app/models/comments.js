exports.definition = {
    config: {
        adapter: {
			"type": "sql",
			"collection_name": "comments",
			"db_file": "/stations.db",
			"db_name": "comments",
			"idAttribute": "id",
			"remoteBackup": false
		}
    }
};