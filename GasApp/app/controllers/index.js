$.index.orientationModes = [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT];

$.index.open();

Utils.Nav.createAllPages();
Utils.Nav.goTo("home", {});
Sync.start();