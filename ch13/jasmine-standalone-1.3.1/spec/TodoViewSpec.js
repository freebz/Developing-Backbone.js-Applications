describe('Tests for TodoView', function() {
    
    beforeEach(function() {
//	$('body').append('<ul id="todoList"></ul>');
	this.model = new Backbone.Model({
	    text: 'My Todo',
	    order: 1,
	    done: false
	});
	this.todoView = new TodoView({model:this.model});
    });

    afterEach(function() {
	this.todoView.remove();
	$('#todoList').remove();
    });

    it('Should be tied to a DOM element when created, based off the property provided.', function() {
	//what html element tag name represents this view?
	expect(this.todoView.el.tagName.toLowerCase()).toBe('li');
    });

    /*
    it('Should have a class of "todos"', function() {
	expect(this.todoView.$el).toHaveClass('todos');
    });
    */

    it('Is backed by a model instance, which provides the data.', function() {

	expect(todoView.model).toBeDefined();

	// what's the value for Todo.get('done') here?
	expect(todoView.model.get('done')).toBe(false); // or toBeFalsy()
    });
});
