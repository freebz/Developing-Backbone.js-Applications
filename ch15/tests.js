function getUniqueString() {
    return 'Hello World';
}

test('should call all subscribers for a message exactly once', function () {
    var message = getUniqueString();
    var spy = sinon.spy();

    PubSub.subscribe( message, spy );
    PubSub.publishSync( message, 'Hello World' );

    ok( spy.calledOnce, 'the subscriber was called once' );
});

test( 'should inspect the jQuery.getJSON usage of jQuery.ajax', function () {
    sinon.spy( jQuery, 'ajax' );

    jQuery.getJSON( '/todos/completed' );

    ok( jQuery.ajax.calledOnce );
    equals( jQuery.ajax.getCall(0).args[0].url, '/todos/completed' );
    equals( jQuery.ajax.getCall(0).args[0].dataType, 'json' );
});

test( 'Should call a subscriber with standard matching', function () {
    var spy = sinon.spy();

    PubSub.subscribe( 'message', spy );
    PubSub.publishSync( 'message', { id: 45 } );

    ok( spy.calledWith( 'message', { id: 45 } ) );
});

test( 'Should call a subscriber with strict matching', function () {
    var spy = sinon.spy();

    PubSub.subscribe( 'message', spy );
    PubSub.publishSync( 'message', 'many', 'arguments' );
    PubSub.publishSync( 'message', 12, 34 );

    // This passes
    ok( spy.calledWith('message', 'many') );
    
    // This however, fails
    ok( spy.calledWithExactly( 'message', 'many' ) );
});

test( 'Should call a subscriber and maintain call order', function () {
    var a = sinon.spy();
    var b = sinon.spy();

    PubSub.subscribe( 'message', a );
    PubSub.subscribe( 'event', b );

    PubSub.publishSync( 'message', { id: 45 } );
    PubSub.publishSync( 'event', [1, 2, 3] );

    ok( a.calledBefore(b) );
    ok( b.calledAfter(a) );
});

test( 'Should call a subscriber and check call counts', function () {
    var message = getUniqueString();
    var spy = sinon.spy();

    PubSub.subscribe( message, spy );
    PubSub.publishSync( message, 'some payload' );

    // Passes if spy was called once and only once.
    ok( spy.calledOnce ); // calledTwice and calledThrice are also supported

    // The number of recored calls.
    equal( spy.callCount, 1 );

    // Directly checking the arguments of the call
    equal( spy.getCall(0).args[0], message );
});

var TodoList = Backbone.Collection.extend({
    model: Todo
});

module( 'Should function when instantiated with model literals', {
    
    setup:function() {
	
	this.todoStub = sinon.stub(window, 'Todo');
	this.model = new Backbone.Model({
	    id: 2,
	    title: 'Hello world'
	});

	this.todoStub.returns(this.model);
	this.todos = new TodoList();

	// Let's reset the relationship to use a stub
	this.todos.model = Todo;

	// add a model
	this.todos.add({
	    id: 2,
	    title: 'Hello world'
	});
    },

    teardown: function() {
	this.todoStub.restore();
    }

});

test('should add a model', function() {
    equal( this.todos.length, 1);
});

test('should find a model by id', function() {
    equal( this.todos.get(2).get('id'), 2 );
});

module('mock');

test('should call all subscribers when exceptions', function () {
    var myAPI = { clearTodo: function () {} };

    var spy = sinon.spy();
    var mock = sinon.mock( myAPI );
//    mock.expects( 'clearTodo' ).once().throws();
    mock.expects( 'clearTodo' ).once();

    PubSub.subscribe( 'message', myAPI.clearTodo );
    PubSub.subscribe( 'message', spy );
    PubSub.publishSync( 'message', undefined );
    
    mock.verify();
    ok( spy.calledOnce );
});

module( 'About Backbone.Model');

test('Can be created with default values for its attributes.', function() {
    expect( 3 );

    var todo = new Todo();
    equal( todo.get('text'), '' );
    equal( todo.get('done'), false );
    equal( todo.get('order'), 0 );
});

test('Will set attributes on the model instance when created.', function() {
    expect( 1 );

    var todo = new Todo( { text: 'Get oil change for car.' } );
    equal( todo.get('text'), 'Get oil change for car.' );

});

test('Will call a custom initialize function on the model instance when created.', function() {
    expect( 1 );

    var toot = new Todo
    ({ text: 'Stop monkeys from throwing their own crap!' });
    equal( toot.get('text'),
	   'Stop monkeys from throwing their own rainbows!' );
});

test('Fires a custom event when the state changes.', function() {
    expect( 1 );

    var spy = sinon.spy();
    var todo = new Todo();

    todo.on( 'change', spy );
    // Change the model state
    todo.set( { text: 'new text' } );

    ok( spy.calledOnce, 'A change event callback was correctly triggered' );
});


test('Can contain custom validation rules, and will trigger an invalid event on failed validation.', function() {
    expect( 3 );

    var errorCallback = sinon.spy();
    var todo = new Todo();

    todo.on('invalid', errorCallback);
    // Change the model state in such a way that validation will fail
    todo.set( { done: 'not a boolean' } );
    todo.save();

    ok( errorCallback.called, 'A failed validation correctly triggered an error' );
    notEqual( errorCallback.getCall(0), undefined );
    equal( errorCallback.getCall(0).args[1], 'Todo.done must be a boolean value.' );

});
