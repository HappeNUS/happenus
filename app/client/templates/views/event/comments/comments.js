function sortComments (comments) {
	var rootComments = [];
	var getComment = function (id) {
		return Comments.findOne({_id: id});
	};
	var populateChildren = function (comment, level) {
		var children = [];
		for (var i = 0; i < comment.children.length; i++) {
			var child = getComment(comment.children[i]);
			children.push(child);
			populateChildren(child, level + 1);
		}
		comment.level = level;
		comment.childComments = children;
	};
	for (var i = 0; i < comments.length; i++) {
		if (!comments[i].parent) {
			rootComments.push(comments[i]);
		}
	}
	for (var i = 0; i < rootComments.length; i++) {
		populateChildren(rootComments[i], 0);
	}
	return rootComments;
}

Template.comments.helpers({
	comments: function () {
		var comments = Comments.find().fetch();
		var root = sortComments(comments);
		return root;
	},
	eventId: function() {
		return this._id;
	}
});