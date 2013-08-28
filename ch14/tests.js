var myString = 'Hello Backbone.js';

test( 'Our first QUnit test - asserting results', function(){
    
    // ok( boolean, message )
    ok( true, 'the test succeeds');
    ok( false, 'the test fails');

    // equal( actualValue, expectedValue, message )
    equal( myString, 'Hello Backbone.js', 'Expected value: Hello Backbone.js!');
});

function reverseString( str ){
    return str.split('').reverse().join('');
}

test( 'reverseString()', function() {
    expect( 5 );
    equal( reverseString('hello'), 'olleh', 'The value expected was olleh' );
    equal( reverseString('foobar'), 'raboof', 'The value expected was raboof' );
    equal( reverseString('world'), 'dlrow', 'The value expected wos dlrow' );
    notEqual( reverseString('world'), 'dlroo', 'The value was expected to not be dlroo' );
    equal( reverseString('bubble'), 'double', 'The value expected was elbbub' );
});


module( 'Module One', {
    setup: function() {
	// run before
    },
    teardown: function() {
	// run after
    }
});

test( 'first test', function() {
    // run the first test
});

test( 'another test', function() {} );

module( 'Module Two' );
test( 'second test', function() {} );
test( 'andther test', function() {} );

module( 'Module Three' );
test( 'third test', function() {} );
test( 'andther test', function() {} );
