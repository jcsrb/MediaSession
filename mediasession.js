/*jslint browser: true, indent: 2 */

// only for browsers that support:
// HTML5 Media (Audio and/or Video) http://caniuse.com/audio
// Local Storage http://caniuse.com/namevalue-storage
if (window.HTMLMediaElement && window.localStorage) {
  (function () {
    "use strict";
    function MediaSession(mediaElement) {
      // attributes
      this.mediaElement = null; // the attached media element            

      this.attachElement = function (mediaElement) {
        this.mediaElement = mediaElement;
        this.mediaElement.session = this;
      };

      var sessionKey = function () {
        //return 
      };

      var addEventHandlers = function () {
        mediaElement.addEventListener('canplay', this.retrieve);
        mediaElement.addEventListener('timeupdate', this.store);
        mediaElement.addEventListener('seeked', this.store);
        mediaElement.addEventListener('ended', this.clear);
      };

      var removeEventHandlers = function () {
        mediaElement.removeEventListener('canplay', this.retrieve);
        mediaElement.removeEventListener('timeupdate', this.storeSession);
        mediaElement.removeEventListener('seeked', this.storeSession);
        mediaElement.removeEventListener('ended', this.clearSession);
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


      /*Callbacks*/
      this.onStore = function () {}; /*noop*/
      this.onRetrieve = function () {}; /*noop*/
      this.onClear = function () {}; /*noop*/



      // if mediaElement is available from the constructor
      if (!!mediaElement) {
        this.attachElement(mediaElement);
      }


    }

    // expose it to the world
    window.MediaSession = MediaSession;
  }());
}