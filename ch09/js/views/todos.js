// js/views/todos.js

var app = app || {};

// Todo Item View
// --------------

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/todos.html'
], function($, _, Backbone, todosTemplate) {

    var TodoView = Backbone.View.extend({

	tagName: 'li',

	template: _.template(todosTemplate),

	events: {
	    'click .toggle': 'togglecompleted',
	    'dblclick label': 'edit',
	    'click .destroy': 'clear',
	    'keypress .edit': 'updateOnEnter',
	    'blur .edit': 'close'
	},

	initialize: function() {
	    /*
	    this.listenTo(this.model, 'change', this.render);
	    this.listenTo(this.model, 'destroy', this.remove);
	    this.listenTo(this.model, 'visible', this.toggleVisible);
	    */
	    this.model.on('change', this.render, this);
	    this.model.view = this;
	},

	render: function() {
	    this.$el.html( this.template( this.model.toJSON() ) );
	    this.setContent();
	    return this;
	    
	    /*
	    this.$el.toggleClass( 'completed', this.model.get('completed') );
	    this.toggleVisible();

	    this.$input = this.$('.edit');
	    return this;
	    */
	},

	setContent: function() {
	    var content = this.model.get('content');
	    this.$('.todo-content').text(content);
	    this.input = this.$('.todo-input');
	    this.input.on('blur', this.close);
	    this.input.val(content);
	},

	toggleVisible : function () {
	    this.$el.toggleClass( 'hidden', this.isHidden());
	},

	isHidden : function () {
	    var isCompleted = this.model.get('completed');
	    return (
		(!isCompleted && app.TodoFilter === 'completed')
		    || (isCompleted && app.TodoFilter === 'active')
	    );
	},

	togglecompleted: function() {
	    this.model.toggle();
	},

	edit: function() {
	    this.$el.addClass('editing');
	    this.$input.focus();
	},

	close: function() {
	    var value = this.$input.val().trim();

	    if ( value ) {
		this.model.save({ title: value });
	    }

	    this.$el.removeClass('editing');
	},

	updateOnEnter: function( e ) {
	    if ( e.which === ENTER_KEY ) {
		this.close();
	    }
	},

	clear: function() {
	    this.model.destroy();
	}
    });

    return TodoView;
});
