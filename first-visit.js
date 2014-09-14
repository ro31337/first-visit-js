/*
 * First Visit Js jQuery Plugin version 0.1
 * Roman Pushkin - roman.pushkin@gmail.com
 */
;(function($){

	'use strict';
	
	$.fn.firstVisit = function(options) {

		var VISIT_KEY_NAME = 'first_visit_key';
		var visitKey = false;
		var cookieRegex = new RegExp("(?:^|.*;\\s*)" + VISIT_KEY_NAME + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*");
		var $elements = $(this);

		var settings = {
			classToAdd: ''
		};

		$.extend(settings, options);

		var setVisitKey = function() {
			var date = new Date();

			if (window.localStorage) {					
				window.localStorage.setItem(VISIT_KEY_NAME,date);
			} else {
				// take care for Y2K38 bug: http://en.wikipedia.org/wiki/Year_2038_problem
				document.cookie =  VISIT_KEY + '=' + escape(date) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
			}
		}

		var getVisitKey = function() {
			if (window.localStorage) {
				return window.localStorage.getItem(VISIT_KEY_NAME);
			} else {
				var maybeVisitKey = unescape(document.cookie.replace(cookieRegex, "$1"));
				return !isNaN(new Date(maybeVisitKey)) ? maybeVisitKey : null;
			}
		}

		// get last visit variable
		if(!visitKey) {
			visitKey = getVisitKey();
		}

		if(!visitKey) {
			setVisitKey();
			
			// show
			$elements.show();

			// add class if any
			if(settings.classToAdd) { $elements.addClass(settings.classToAdd); }
		}
	}
})(jQuery);