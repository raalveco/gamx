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
    },
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {
            sql: function(query) {
                return this.fetch({
                    //query: { statement: query, params: params }
                    query: query
                });
            }
        });
 
        return Collection;
    }
};