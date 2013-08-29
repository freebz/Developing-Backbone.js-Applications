window.Todo = Backbone.Model.extend({

    defaults: {
	text: '',
	done: false,
	order: 0
    },

    initialize: function() {
	this.set({text: this.get('text')}, {silent: true});
    },

    validate: function(attrs) {
	if (attrs.hasOwnProperty('done') && !_.isBoolean(attrs.done)) {
	    return 'Todo.done must be a boolean value.';
	}
    },

    toggle: function() {
	this.save({done: !this.get('done')});
    }

});
