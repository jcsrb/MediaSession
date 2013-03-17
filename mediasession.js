/*jslint browser: true, indent: 2 */

// only for browsers that support:
// HTML5 Media (Audio and/or Video) http://caniuse.com/audio
// Local Storage http://caniuse.com/namevalue-storage
if (window.HTMLMediaElement && window.localStorage) {
  var MediaSession = (function () {
    "use strict";
    function MediaSession(mediaElement) {

      this.attachElement = function (mediaElement) {
        this.mediaElement = mediaElement;
        this.mediaElement.session = this;
        this.sessionKey = name + "-" + this.mediaElement.currentSrc;
        this.addEventHandlers();
      };

      /* store the current location */
      this.store = function () {
        this.session.onStore();
      };

      /* restore the stored location */
      this.restore = function () {
        this.session.onRestore();
      };

      /* clear the stored location */
      this.clear = function () {
        this.session.onClear();
      };

      /* end session */
      this.end = function () {
        this.session.clear();
        this.session.onEnd();
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