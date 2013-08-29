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
