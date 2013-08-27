describe('Tests for TodoList', function() {

    it('Can add Model instances as objects and arrays.', function() {
	var todos = new TodoList();
	
	expect(todos.length).toBe(0);

	todos.add({ text: 'Clean the kitchen' });

	// how many todos have been added so far?
	expect(todos.length).toBe(1);

	todos.add([
	    { text: 'Do the laundry', done: true },
	    { text: 'Go to the gym'}
	]);

	// how many are there in total now?
	expect(todos.length).toBe(3);
    });

});
