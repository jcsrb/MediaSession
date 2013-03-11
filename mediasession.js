/*jslint browser: true*/

// only for browsers that support:
// HTML5 Media (Audio and/or Video) http://caniuse.com/audio
// Local Storage http://caniuse.com/namevalue-storage
if (window.HTMLMediaElement && window.localStorage) {
	(function () {
		"use strict";
		var MediaSession = function () {

		};

		// expose it to the world
		window.MediaSession = MediaSession;
	}());
}