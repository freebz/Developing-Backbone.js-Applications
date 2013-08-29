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
