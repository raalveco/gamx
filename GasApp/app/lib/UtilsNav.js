var Nav = {};

// Navigation Utils
Globals.set("window", "history", []);
Globals.set("window", "currentWindow", null);
Globals.set("window", "allPages", {});

// Load all pages into memory to avoid memory leaks
Nav.createAllPages = function(){	
    var pages = ["home","list"];
    for (var i=0; i < pages.length; i++) {
        var page = pages[i];
        Ti.API.info("GASAPP: Pre-opening page: " + page + ".");
        var cpage = Alloy.createController(page);
        if(cpage.index){
        	Globals.get("window", "allPages")[page] = cpage;
        }
    };
};

// open a page
Nav.goTo = Nav.goto = function(page, parameters, forceModal) {
	Ti.API.info("GASAPP: Opening page: " + page + ".");
	Globals.set("window", "currentControllerName", page);
    var cpage = Globals.get("window", "allPages")[page];
    Globals.get("window", "history").push(cpage);
	// Store current window object for easy access (Note that window tag of View must have "index" as ID)
	Globals.set("window", "currentWindow", cpage.index);
    var params = {};
    //params.activityEnterAnimation = Ti.Android.R.anim.fade_in; //fade_in
    //params.activityExitAnimation = Ti.Android.R.anim.fade_out; //fade_out
    params.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
    params.fullscreen = false;
    params.navBarHidden = true;
    params.modal = true;
    //params.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE | Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_HIDDEN;
    cpage.getView().modal = false;
    cpage.getView().open(params);
    Utils.Log.trace("Setting CurrentWindow to: " + Globals.get("window", "currentWindow").titleid);
    // Call justonce function if defined
	if(!cpage.alreadyrun){
		cpage.alreadyrun = true;
		if(cpage.justonce){
			cpage.justonce(parameters);
		}
	}
	// Call init function if defined
	if(cpage.init) cpage.init(parameters);
	Utils.Log.info("Page " + page + " is open.");
	return cpage;
};

// go back the specified amount of pages and show a message after that if specified
Nav.back = function(amount, message) {
	var hst = Globals.get("window", "history");
	if(!amount) amount = 1;
	var from = hst.length - amount;
	// loop for closing windows
	for (var i=0; i < amount; i++) {
		Utils.Log.trace("Amount of history stack (in loop): " + hst.length);
		if(hst[from + i]){
			var w = hst[from + i].index;
			if (w) {
				Utils.Log.info("Closing Window: " + w.title);
				w.close();
			}
		}
	};
	// loop for updating history stack
	for (var i=0; i < amount; i++) {
		hst.pop();
	}
	// after closing windows, update references
	if(hst.length > 0){
		if(hst[hst.length-1]){
			Globals.set("window", "currentWindow", hst[hst.length-1].index);
			Utils.Log.trace("Setting CurrentWindow to: " + Globals.get("window", "currentWindow").titleid);
		}
	}else{
		Globals.set("window", "currentWindow", null);
		Utils.Log.trace("Current Window is Root");
	}
	
	// show message if needed
	if(message){
		setTimeout(function(){
			alert(message);
		}, 500);
	}
};

// go back to the specified page by page title attribute of window tag and show a message after that if specified
Nav.backTo = function(titleid, message) {
	var amount = 0;
	for(var i = 0; i < Globals.get("window", "history").length; i++){
		if(amount == 0){
			var w = Globals.get("window", "history")[i].index;
			if(w) {
				if(w.titleid == titleid){
					amount = Globals.get("window", "history").length - i - 1;
				}
			}
		}
	}
	if(amount > 0){
		Utils.Nav.back(amount, message);
	}else{
		Utils.Log.trace("Amount is 0.");
	}
};

// close the app
Nav.closeApp = function(delay) {
	if(delay){
		setTimeout(function() {
			var activity = Titanium.Android.currentActivity;
	        activity.finish();
	    }, delay);
	}else{
		var activity = Titanium.Android.currentActivity;
		activity.finish();
	}
};

// check if there's connection to internet
Nav.isConnected = function() {
	return Titanium.Network.networkType != Titanium.Network.NETWORK_NONE;
};

module.exports = Nav;