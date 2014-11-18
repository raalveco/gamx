var Station = function(id, name, description, municipality, neighborhood, postcode, state, street, town, prices1, prices2, prices3, prices4){
	this.id = id;
	this.name = name;
	this.description = description;
	this.municipality = municipality;
	this.neighborhood = neighborhood;
	this.postcode = postcode;
	this.state = state;
	this.street = street;
	this.town = town;
	this.prices1 = prices1;
	this.prices2 = prices2;
	this.prices3 = prices3;
	this.prices4 = prices4;
};

module.exports = Station;