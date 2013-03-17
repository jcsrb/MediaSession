/*jslint browser: true, indent: 2 */

// only for browsers that support:
// HTML5 Media (Audio and/or Video) http://caniuse.com/audio
// Local Storage http://caniuse.com/namevalue-storage
if (window.HTMLMediaElement && window.localStorage) {
  var MediaSession = (function () {
    "use strict";
    function MediaSession(mediaElement) {

      this.attachElement = function (mediaElement) {
        this.mediaElement = mediaElement; // build reference
        this.mediaElement.session = this; // build reverse reference
        this.sessionKey = name + "-" + this.mediaElement.currentSrc; // build sessionKey 
        this.addEventHandlers(); // attach handelers
      };

      /* store the current location */
      this.store = function () {
        this.session.onStore(); // execute callback
      };

      /* restore the stored location */
      this.restore = function () {
        this.session.onRestore(); // execute callback
      };

      /* clear the stored location */
      this.clear = function () {
        this.session.onClear(); // execute callback
      };

      /* end session */
      this.end = function () {
        this.session.removeEventHandlers(); // remove handlers
        this.session.clear(); // clear session
        this.session = undefined; // remove referece and let GC do it's thing
        this.session.onEnd(); // execute callback
      };

      this.addEventHandlers = function () {
        if (this.mediaElement.hasAttribute("autorestore")) {
          this.mediaElement.addEventListener('canplay', this.restore);
        }
        this.mediaElement.addEventListener('timeupdate', this.store);
        this.mediaElement.addEventListener('ended', this.end);
      };

      this.removeEventHandlers = function () {
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
    // expose it to the world
    return MediaSession;
  }());
}