/*jslint browser: true, indent: 2 */

// only for browsers that support:
// HTML5 Media (Audio and/or Video) http://caniuse.com/audio
// Local Storage http://caniuse.com/namevalue-storage
if (window.HTMLMediaElement && window.localStorage) {
  var MediaSession = (function () {
    "use strict";
    function MediaSession(mediaElement) {

      this.attachElement = function (mediaElement) {
        if (mediaElement.tagName.toLowerCase() !== "audio" && mediaElement.tagName.toLowerCase() !== "video") {
          throw new Error('MediaSession requires a Audio or Video DOM Node to be passed in here');
        }
        this.mediaElement = mediaElement; // build reference
        this.mediaElement.session = this; // build reverse reference                
        this.addEventHandlers(); // attach handelers
      };

      this.buildSessionKey = function () {
        this.session.sessionKey = MediaSession.name + "-" + this.currentSrc; // build sessionKey 
      };

      /* store the current location */
      this.store = function () {
        if (!this.paused) { // only when not paused
          var sessionTime = this.currentTime; // get element time
          localStorage.setItem(this.session.sessionKey, sessionTime);  //save it
          this.session.onStore(); // execute callback
        }
      };

      /* restore the stored location */
      this.restore = function () {
        var sessionTime = localStorage.getItem(this.session.sessionKey); // get stored time
        this.currentTime = sessionTime || 0; // set it, fall back to 0
        this.session.onRestore(); // execute callback
      };

      /* clear the stored location */
      this.clear = function () {
        localStorage.removeItem(this.session.sessionKey); //remove saved values from the localstorage
        this.session.onClear(); // execute callback
      };

      /* end session */
      this.end = function () {
        this.session.removeEventHandlers(); // remove handlers
        this.session.clear(); // clear session
        this.session = undefined; // remove reference and let GC do it's thing
        this.session.onEnd(); // execute callback
      };

      this.addEventHandlers = function () {
        this.mediaElement.addEventListener('loadstart', this.buildSessionKey);
        if (this.mediaElement.hasAttribute("autorestore")) {
          this.mediaElement.addEventListener('canplay', this.restore);
        }
        this.mediaElement.addEventListener('timeupdate', this.store);
        if (!this.mediaElement.hasAttribute("loop")) { //
          this.mediaElement.addEventListener('ended', this.end);
        }
      };

      this.removeEventHandlers = function () {
        this.mediaElement.removeEventListener('loadstart', this.buildSessionKey);
        this.mediaElement.removeEventListener('canplay', this.restore);
        this.mediaElement.removeEventListener('timeupdate', this.store);
        this.mediaElement.removeEventListener('ended', this.end);
      };

      //attachElement if mediaElement is available from the constructor
      if (!!mediaElement) {
        this.attachElement(mediaElement);
      }
    }

    MediaSession.prototype = {
      /*Callbacks*/
      onStore : function () {}, /*noop*/
      onRestore : function () {}, /*noop*/
      onClear : function () {}, /*noop*/
      onEnd : function () {} /*noop*/
    };

    MediaSession.autoApply = function () {
      var mediaElements = document.querySelectorAll("audio, video"), //get all MediaElements
        mediaElementsCount = mediaElements.length;
      while (mediaElementsCount > 0) {
        mediaElementsCount -= 1;
        if (mediaElements[mediaElementsCount].hasAttribute("session")) {
          new MediaSession(mediaElements[mediaElementsCount]); // intialize them all
        }
      }
    };
    // expose it to the world
    return MediaSession;
  }());
}