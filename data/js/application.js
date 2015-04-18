(function () {
'use strict';
define(
	[
		'require',
		'util',
		'lexer-input',
		'tabwidth-input',
		'vendor'
	],
	function (require, Util, LexerInput, TabwidthInput) {
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
				config = config || {};
				Util.highlightLineFromHash();
				Util.setTabwidthFromLocalStorage();
				TabwidthInput.initialize();
				LexerInput.initialize(config.lexers);
				this.configureTooltips();
				this.setupToggleSelectAllEvent();
			},

			setupLineHighlight: function () {
				$(window).on('hashchange', Util.highlightLineFromHash);
			},
			
			configureTooltips: function () {
				$('[rel="tooltip"]').tooltip({
					placement: 'bottom',
					container: 'body',
				});
			},

			setupToggleSelectAllEvent: function () {
				$('#history-all').on('click', function(event) {
					// Suppress click event on table heading
					event.stopImmediatePropagation();
				});
				$('#history-all').on('change', function(event) {
					var checked = $(event.target).prop('checked');
					$('.delete-history').prop('checked', checked);
				});
			}

		};

		return App;
	}
);
})();