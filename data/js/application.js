(function () {
'use strict';
define(
	[
		'require',
		'util',
		'lexer-input',
		'vendor'
	],
	function (require, Util, LexerInput) {
		require(['script']);
		var App = {
			 // Gets called for every request (before page load)
			initialize: function () {
				this.setupLineHighlight();
			},

			/*
			 * Gets called for every request after page load
			 * config contains app config attributes passed from php
			 */
			onPageLoaded: function (config) {
				Util.highlightLineFromHash();
				LexerInput.initialize(config.lexers);
			},

			setupLineHighlight: function () {
				$(window).on('hashchange', Util.highlightLineFromHash);
			},

		};

		return App;
	}
);
})();
