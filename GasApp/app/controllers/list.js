$.back.on("click", function(){
	Utils.Nav.back();
});

$.map.on("click", function(){
	
});

$.init = function(parameters){
	Utils.View.empty($.results);
	for (var i=0; i < parameters.results.length; i++) {
		var station = parameters.results[i];
		var row = Ti.UI.createView({
			height: "70dp",
			width: Ti.UI.FILL,
			backgroundColor: "#CCC",
			layout: "composite"
		});
		var left = Ti.UI.createView({
			height: Ti.UI.FILL,
			backgroundColor: "#FFF",
			width: "20%",
			left: "2dp",
			bottom: "2dp",
			top: "2dp",
			layout: "vertical"
		});
		var right = Ti.UI.createView({
			height: Ti.UI.FILL,
			backgroundColor: "#FFF",
			width: "76%",
			right: "2dp",
			bottom: "2dp",
			top: "2dp",
			layout: "vertical"
		});
		var price = Ti.UI.createLabel({
			color: "#00FF00",
			font: { fontSize: "20px" },
			text: station.prices1
		});
		var name = Ti.UI.createLabel({
			color: "#000",
			font: { fontSize: "16px" },
			text: station.name,
			align: "left",
			width: Ti.UI.FILL
		});
		var address = Ti.UI.createLabel({
			color: "#000",
			font: { fontSize: "14px" },
			text: station.street,
			width: Ti.UI.FILL
		});
		row.add(left);
		row.add(right);
		left.add(price);
		right.add(name);
		right.add(address);
		$.results.add(row);
	};
};
