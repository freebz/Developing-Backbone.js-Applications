// js/collections/todos.js

// Todo Collection
// ---------------

// The collection of todos is backed by *localStorage* instead of a remote
// server.

define([
    'underscore',
    'backbone',
    'libs/backbone/backbone.localstorage',
    'models/todo'
], function(_, Backbone, Store, Todo) {

    var TodoCollection = Backbone.Collection.extend({
	
	// Reference to this collection's medel.
	model: Todo,

	localStorage: new Store('todos'),

	done: function() {
	    return this.filter(function( todo ) {
		return todo.get('done');
	    });
	},

	remaining: function() {
	    return this.without.apply( this, this.done() );
	},

	nextOrder: function() {
	    if ( !this.length ){
		return 1;
	    }
	    return this.last().get('order') + 1;
	},

	comparator: function( todo ) {
	    return todo.get('order');
	}
    });

    return new TodoCollection;

});

    //app.Todos = new TodoList();

