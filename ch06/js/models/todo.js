// js/models/todo.js

var app = app || {};

// Todo Model
// ---------
// Our basic **Todo** medel has 'title', 'order', and 'completed' attributes.

app.Todo = Backbone.Model.extend({

    // Default attributtes ensure that each todo created has 'title' and
    // 'completed' keys.
    defaults: {
	title: '',
	completed: false
    },

    // Toggle the 'completed' state of this todo item.
    toggle: function() {
	this.save({
	    completed: !this.get('completed')
	});
    }

});
