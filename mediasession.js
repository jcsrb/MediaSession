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
        
        this.onStore();
      };

      /* retrieve the stored location */
      this.retrieve = function () {
        this.onRetrieve();
      };

      /* clear the stored location */
      this.clear = function () {
        this.onClear();
      };

      this.addEventHandlers = function () {
        this.mediaElement.addEventListener('canplay', this.retrieve);
        this.mediaElement.addEventListener('timeupdate', this.store);
        this.mediaElement.addEventListener('seeked', this.store);
        this.mediaElement.addEventListener('ended', this.clear);
      };

      this.removeEventHandlers = function () {
        this.mediaElement.removeEventListener('canplay', this.retrieve);
        this.mediaElement.removeEventListener('timeupdate', this.storeSession);
        this.mediaElement.removeEventListener('seeked', this.storeSession);
        this.mediaElement.removeEventListener('ended', this.clearSession);
      };


      //attachElement if mediaElement is available from the constructor
      if (!!mediaElement) {
        this.attachElement(mediaElement);
      }
    }


    MediaSession.prototype = {
      /*Callbacks*/
      onStore : function () {}, /*noop*/
      onRetrieve : function () {}, /*noop*/
      onClear : function () {} /*noop*/
    };
    // expose it to the world
    return MediaSession;
  }());
}