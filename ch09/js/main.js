// js/main.js

var ENTER_KEY = 13;

require.config({
    //baseUrl: '../',
    paths: {
	jquery: 'libs/jquery/jquery',
	underscore: 'libs/underscore/underscore',
	backbone: 'libs/backbone/backbone',
	text: 'libs/require/text'
    },
    shim:{
	'underscore': {
	    exports: '_'
	},
	'backbone': {
	    deps: ['jquery', 'underscore'],
	    exports: 'Backbone'
	}
    }
});

require(['views/app'], function(AppView) {
    var app_view = new AppView;
});
