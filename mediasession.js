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
        var session = this.session || this; 
        if (!this.paused) { // only when not paused
          var sessionTime = session.mediaElement.currentTime; // get element time
          localStorage.setItem(session.sessionKey, sessionTime);  //save it
          session.onStore(); // execute callback
        }
      };

      /* restore the stored location */
      this.restore = function () {
        var session = this.session || this;
        var sessionTime = localStorage.getItem(session.sessionKey); // get stored time
        session.mediaElement.currentTime = sessionTime || 0; // set it, fall back to 0
        session.onRestore(); // execute callback
      };

      /* clear the stored location */
      this.clear = function () {
        var session = this.session || this;
        localStorage.removeItem(session.sessionKey); //remove saved values from the localstorage
        session.onClear(); // execute callback
      };

      /* end session */
      this.end = function () {
        var session = this.session || this;
        session.removeEventHandlers(); // remove handlers
        session.clear(); // clear session
        session.onEnd(); // execute callback
        session = undefined; // remove reference and let GC do it's thing        
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