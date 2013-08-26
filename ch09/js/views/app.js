// js/views/app.js

// The Application
// ---------------

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/todos',
    'views/todos',
    'text!templates/stats.html'
], function($, _, Backbone, Todos, TodoView, statsTemplate) {

    var AppView = Backbone.View.extend({
	
	el: '#todoapp',

	statsTemplate: _.template(statsTemplate),

	events: {
	    'keypress #new-todo': 'createOnEnter',
	    'click #clear-completed': 'clearCompleted',
	    'click #toggle-all': 'toggleAllComplete'
	},

	initialize: function() {
	    this.allCheckbox = this.$('#toggle-all')[0];
	    this.$input = this.$('#new-todo');
	    this.$footer = this.$('#footer');
	    this.$main = this.$('#main');

	    this.listenTo(Todos, 'add', this.addOne);
	    this.listenTo(Todos, 'reset', this.addAll);

	    this.listenTo(Todos, 'change:completed', this.filterOne);
	    this.listenTo(Todos, 'filter', this.filterAll);
	    this.listenTo(Todos, 'all', this.render);

	    Todos.fetch();
	},

	render: function() {
	    var done = Todos.done().length;
	    this.$('#todo-stats').html(this.statsTemplate({
		total: Todos.length,
		done: Todos.done().length,
		remaining: Todos.remaining().length
	    }));

	    var remaining = Todos.remaining().length;

	    if ( Todos.length ) {
		this.$main.show();
		this.$footer.show();

		/*
		this.$footer.html(this.statsTemplate({
		    completed: completed,
		    remaining: remaining
		}));
		*/

		this.$('#filters li a')
		    .removeClass('selected')
		    .filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
		    .addClass('selected');
	    } else {
		this.$main.hide();
		this.$footer.hide();
	    }

	    //this.allCheckbox.checked = !remaining;
	    
	},

	addOne: function( todo ) {
	    var view = new TodoView({ model: todo });
	    $('#todo-list').append( view.render().el );
	},

	addAll: function() {
	    this.$('#todo-list').html('');
	    Todos.each(this.addOne, this);
	},

	filterOne: function (todo) {
	    todo.trigger('visible');
	},

	filterAll: function () {
	    Todos.each(this.filterOne, this);
	},

	newAttributes: function() {
	    return {
		content: this.$input.val().trim(),
		order: Todos.nextOrder(),
		done: false
	    };
	},

	createOnEnter: function( event ) {
	    if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
		return;
	    }

	    Todos.create( this.newAttributes() );
	    this.$input.val('');
	},

	clearCompleted: function() {
	    _.invoke(Todos.completed(), 'destroy');
	    return false;
	},

	toggleAllComplete: function() {
	    var done = this.allCheckbox.checked;

	    Todos.each(function( todo ) {
		todo.save({
		    'done': done
		});
	    });
	}
    });

    return AppView;

});
