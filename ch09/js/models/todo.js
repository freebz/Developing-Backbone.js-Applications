// js/models/todo.js

// Todo Model
// ---------
// Our basic **Todo** medel has 'title', 'order', and 'completed' attributes.

define(['underscore', 'backbone'], function(_, Backbone) {

    var TodoModel = Backbone.Model.extend({

	// Default attributtes ensure that each todo created has 'title' and
	// 'completed' keys.
	defaults: {
	    content: 'empty todo...',
	    done: false
	},

	initialize: function() {
	},

	// Toggle the 'completed' state of this todo item.
	toggle: function() {
	    this.save({done: !this.get('done')});
	},

	// Remove this Todo from *localStorage* and delete its view.
	clear: function() {
	    this.destroy();
	    this.view.remove();
	}

    });

    return TodoModel;

});
