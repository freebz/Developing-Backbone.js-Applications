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


// Define a simple model and collection modeling a store and
// list of stores

var Store = Backbone.Model.extend({});

var StoreList = Backbone.Collection.extend({
    model: Store,
    comparator: function( Store ) { return Store.get('name') }
});

// Define a group for our tests
module( 'StoreList sanity check', {
    setup: function() {
	this.list = new StoreList;
	this.list.add(new Store({ name: 'Costcutter' }));
	this.list.add(new Store({ name: 'Target' }));
	this.list.add(new Store({ name: 'Walmart' }));
	this.list.add(new Store({ name: 'Barnes & Noble' }));
    },
    teardown: function() {
	window.errors = null;
    }
});

// Test the order of items added
test( 'test ordering', function() {
    expect( 1 );
    var expected = ['Barnes & Noble', 'Costcutter', 'Target', 'Walmart'];
    var actual = this.list.pluck('name');
    deepEqual( actual, expected, 'is maintained by comparator' );
});
