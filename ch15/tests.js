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
