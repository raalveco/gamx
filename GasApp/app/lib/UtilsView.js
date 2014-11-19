var View = {};

// remove all children of an element
View.empty = function(element){
	for(var c = element.children.length - 1; c >= 0; c--){
        element.remove(element.children[c]);
    }
    return element;
};

// add classes (space-separated string)
View.addClasses = function(element, classes){
	var currentController = Globals.get("window", "history")[Globals.get("window", "history").length-1];
	if(currentController){
		currentController.addClass(element, classes);
	}
	return element;
};

// remove classes (space-separated string)
View.removeClasses = function(element, classes){
	var currentController = Globals.get("window", "history")[Globals.get("window", "history").length-1];
	if(currentController){
		currentController.removeClass(element, classes);
	}
	return element;
};

// adds padding to an element by adding space characters before and after the text or title
View.padElement = function(element, padding){
	var p = "";
	for(var i = 0; i < padding; i++){
		p += " ";
	}
	if(element.title != null){
		element.title = p + element.title + p;
	}else if(element.text != null){
		element.text = p + element.text + p;
	}
};

module.exports = View;