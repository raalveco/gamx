var Comment = function(id, user, message, rating, date){
	this.id = id;
	this.user = user;
	this.message = message;
	this.rating = rating;
	this.date = date;
};

module.exports = Comment;