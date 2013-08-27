describe('Tests for Todo', function() {

    it('Can be created with default values for its attributes.', function() {
	var todo = new Todo();
	expect(todo.get('text')).toBe('');
    });

    it('Can contain custom validation rules, and will trigger an invalid event on failed validation.', function() {

	var errorCallback = jasmine.createSpy('-invalid event callback-');
	
	var todo = new Todo();

	todo.on('invalid', errorCallback);

	todo.set({done:'a non-boolean value'});
	todo.save();

	var errorArgs = errorCallback.mostRecentCall.args;

	expect(errorArgs).toBeDefined();
	expect(errorArgs[0]).toBe(todo);
	expect(errorArgs[1]).toBe('Todo.done must be a boolean value.');
    });
});
