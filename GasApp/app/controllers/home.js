// Load place holders programmatically because it can't be set from view or style
$.header_search.hintText = L("index_findgascityzip");

$.header_search_button.on("click", function(){
	var value = $.header_search.value.trim();
	if(value != ""){
		var results = DB.getStationsByCityOrZip(value);
		if(results && results.length > 0){
			Utils.Nav.goTo("list", { results: results });
		}else{
			alert("No results");
		}
	}else{
		// TODO: show alert
	}
});

$.init = function(parameters){
	$.header_search.blur();
};
