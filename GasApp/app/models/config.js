exports.definition = {
    config: {
        "columns": {
            "key": "TEXT PRIMARY KEY",
            "value": "TEXT"
        },
        "adapter": {
            "type": "sql",
            "collection_name": "config",
            "idAttribute": "key"
        }
    }
};