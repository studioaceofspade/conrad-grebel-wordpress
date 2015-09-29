

(function($) { 
	$(document).ready(function() {
        menuDropdown();
        populateMatcher();
        allowThrough();
    });
    

    function menuDropdown() {
        $('.menu').click(function() {
            
            $trigger = $(this);
            $nav     = $('#main-nav');
            
            $nav.slideToggle('fast');
            
            if($trigger.hasClass('open')) {
                $trigger.removeClass('open');
            } else {
                $trigger.addClass('open');
            }
        });        
    }
    
    function allowThrough() {
	Cookies.remove('cgStandardUser');
        $('.no-pricing').click(function(e) {
            Cookies.set('cgStandardUser','true', { expires : 1 });
        });
        
        if(Cookies.get('cgStandardUser')) {
            $('body').addClass('strip-prices');
        }
    }
    
    function populateMatcher() {
        
        var $container = $('.matcher');
        
        if($container.length > 0 && $('#chair').length > 0) {

            var collection = JSON.parse(localStorage.getItem('builds'));
            
            if(collection) {
                
                for(var n = 0; n < collection.length; n++) {
                    
                    // LEG TABLE CONFIGURATION
                    if( collection[n].furnitureType[0] === 'leg-table') {
                        
                        $container.removeClass('hide');
                        
                        // Setup HTML structure    
                        var $title = $('<h2>In order to match your table:</h2>');
                        var $tcont  = $('<div class="table-match row">');
                        
                        // Get the parts we need to construct our filler data
                        var piece   = collection[n];
                        var wood    = piece['choose-a-wood-type'].selected[0];
                        
                        // Store the information we need from the collection
                        var tableStyle  = piece['choose-a-leg-style'].selected[1];
                        var tableWood   = piece['choose-a-wood-type'].selected[1];
                        var topColor    = piece['choose-a-top-color-'+wood].selected[1];
                        var bottomColor = piece['choose-a-bottom-color-'+wood].selected[1];  
                        var seats       = piece.dimensions.seats;
                        
                        // Structure our info into DOM elements
                        var $tstyle     = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Table Style: </strong>' + tableStyle + ', seats ' + seats + '</div></div>');
                        var $twood      = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Wood: </strong>' + tableWood + '</div></div>');
                        var $ttcolor    = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Top Color: </strong>' + topColor + '</div></div>');
                        var $tbcolor    = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Bottom Color: </strong>' + bottomColor + '</div></div>');

                        $tcont.append($tstyle);
                        $tcont.append($twood);
                        $tcont.append($ttcolor);
                        $tcont.append($tbcolor);
                        
                        $tcont.appendTo($container);
                        $title.prependTo($container);
                        
                    }
                    
                    // SINGLE PEDESTAL CONFIGURATION
                    if( collection[n].furnitureType[0] === 'single-pedestal-table') {
                        
                        $container.removeClass('hide');
                        
                        // Setup HTML structure    
                        var $title = $('<h2>In order to match your table:</h2>');
                        var $tcont  = $('<div class="table-match row">');
                        
                        // Get the parts we need to construct our filler data
                        var piece   = collection[n];
                        var wood    = piece['choose-a-wood-type'].selected[0];
                        
                        // Store the information we need from the collection
                        var tableStyle  = piece['choose-a-pedestal-style'].selected[1];
                        var tableWood   = piece['choose-a-wood-type'].selected[1];
                        var topColor    = piece['choose-a-top-color-'+wood].selected[1];
                        var bottomColor = piece['choose-a-top-color-'+wood].selected[1];  
                        var seats       = piece.dimensions.seats;
                        
                        // Structure our info into DOM elements
                        var $tstyle     = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Table Style: </strong>' + tableStyle + ', seats ' + seats + '</div></div>');
                        var $twood      = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Wood: </strong>' + tableWood + '</div></div>');
                        var $ttcolor    = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Top Color: </strong>' + topColor + '</div></div>');
                        var $tbcolor    = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Bottom Color: </strong>' + bottomColor + '</div></div>');

                        $tcont.append($tstyle);
                        $tcont.append($twood);
                        $tcont.append($ttcolor);
                        $tcont.append($tbcolor);
                        
                        $tcont.appendTo($container);
                        $title.prependTo($container);
                        
                    }
                    
                    // DOUBLE PEDESTAL CONFIGURATION
                    if( collection[n].furnitureType[0] === 'double-pedestal-table') {
                        
                        $container.removeClass('hide');
                        
                        // Setup HTML structure    
                        var $title = $('<h2>In order to match your table:</h2>');
                        var $tcont  = $('<div class="table-match row">');
                        
                        // Get the parts we need to construct our filler data
                        var piece   = collection[n];
                        var wood    = piece['choose-a-wood-type'].selected[0];
                        
                        // Store the information we need from the collection
                        var tableStyle  = piece['choose-a-double-pedestal-table'].selected[1];
                        var tableWood   = piece['choose-a-wood-type'].selected[1];
                        var topColor    = piece['choose-a-top-color-'+wood].selected[1];
                        var bottomColor = piece['choose-a-top-color-'+wood].selected[1];  
                        var seats       = piece.dimensions.seats;
                        
                        // Structure our info into DOM elements
                        var $tstyle     = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Table Style: </strong>' + tableStyle + ', seats ' + seats + '</div></div>');
                        var $twood      = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Wood: </strong>' + tableWood + '</div></div>');
                        var $ttcolor    = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Top Color: </strong>' + topColor + '</div></div>');
                        var $tbcolor    = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Bottom Color: </strong>' + bottomColor + '</div></div>');

                        $tcont.append($tstyle);
                        $tcont.append($twood);
                        $tcont.append($ttcolor);
                        $tcont.append($tbcolor);
                        
                        $tcont.appendTo($container);
                        $title.prependTo($container);
                        
                    }
                    
                    // DOUBLE PEDESTAL CONFIGURATION
                    if( collection[n].furnitureType[0] === 'trestle-table') {
                        
                        $container.removeClass('hide');
                        
                        // Setup HTML structure    
                        var $title = $('<h2>In order to match your table:</h2>');
                        var $tcont  = $('<div class="table-match row">');
                        
                        // Get the parts we need to construct our filler data
                        var piece   = collection[n];
                        var wood    = piece['choose-a-wood-type'].selected[0];
                        
                        // Store the information we need from the collection
                        var tableStyle  = piece['choose-a-trestle-table'].selected[1];
                        var tableWood   = piece['choose-a-wood-type'].selected[1];
                        var topColor    = piece['choose-a-top-color-'+wood].selected[1];
                        var bottomColor = piece['choose-a-top-color-'+wood].selected[1];  
                        var seats       = piece.dimensions.seats;
                        
                        // Structure our info into DOM elements
                        var $tstyle     = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Table Style: </strong>' + tableStyle + ', seats ' + seats + '</div></div>');
                        var $twood      = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Wood: </strong>' + tableWood + '</div></div>');
                        var $ttcolor    = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Top Color: </strong>' + topColor + '</div></div>');
                        var $tbcolor    = $('<div class="col-md-6 table-match-style match-block"><div class="match-wrapper"><strong>Bottom Color: </strong>' + bottomColor + '</div></div>');

                        $tcont.append($tstyle);
                        $tcont.append($twood);
                        $tcont.append($ttcolor);
                        $tcont.append($tbcolor);
                        
                        $tcont.appendTo($container);
                        $title.prependTo($container);
                        
                    }
                    
                }
                
            }
        
            
        }
        
    
    
}
})( jQuery );

/*!
 * Javascript Cookie v1.5.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	var jQuery;
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		try {
			jQuery = require('jquery');
		} catch(e) {}
		module.exports = factory(jQuery);
	} else {
		// Browser globals
		var _OldCookies = window.Cookies;
		var api = window.Cookies = factory(window.jQuery);
		api.noConflict = function() {
			window.Cookies = _OldCookies;
			return api;
		};
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return api.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return api.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(api.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return api.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = api.raw ? s : parseCookieValue(s);
		return isFunction(converter) ? converter(value) : value;
	}

	function extend() {
		var key, options;
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			options = arguments[ i ];
			for (key in options) {
				result[key] = options[key];
			}
		}
		return result;
	}

	function isFunction(obj) {
		return Object.prototype.toString.call(obj) === '[object Function]';
	}

	var api = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !isFunction(value)) {
			options = extend(api.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()".
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	api.get = api.set = api;
	api.defaults = {};

	api.remove = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		api(key, '', extend(options, { expires: -1 }));
		return !api(key);
	};

	if ( $ ) {
		$.cookie = api;
		$.removeCookie = api.remove;
	}

	return api;
}));
