/*
 * AudioSession
 *
 * Copyright (c) 2013 Jakob Cosoroaba <jakob@cosoroaba.ro>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Developed by Jakob Cosoroaba
 *
 * <http://jakob.cosoroaba.ro/>
 */

(function () {
  "use strict";
  if (window.HTMLAudioElement && window.localStorage) {
    Object.defineProperty(HTMLAudioElement.prototype, 'saveSession', {
      get: function () { return this.hasAttribute('save-session'); },
      set: function (value) {
        if (!!value) {
          this.setAttribute('save-session', NaN);
        } else {
          this.removeAttribute('save-session');
        }
        this.initSaveSession();
      }
    });

    Object.defineProperty(HTMLAudioElement.prototype, 'sessionKey', {
      get: function () { return 'audioSession-' + this.currentSrc; }
    });


    HTMLAudioElement.prototype.storeSession = function () {
      if (!this.paused) {
        var sessionTime = this.currentTime;
        localStorage.setItem(this.sessionKey, sessionTime);
        this.dispatchEvent(new CustomEvent(
          "sessionStored",
          {
            detail: {
              sessionTime: sessionTime
            },
            bubbles: true,
            cancelable: true
          }
        ));
      }
    };

    HTMLAudioElement.prototype.retrieveSession = function () {
      var sessionTime = localStorage.getItem(this.sessionKey);
      this.currentTime = sessionTime || 0;
      this.dispatchEvent(new CustomEvent(
        "sessionRestored",
        {
          detail: {
            sessionTime: sessionTime
          },
          bubbles: true,
          cancelable: true
        }
      ));
    };

    HTMLAudioElement.prototype.clearSession = function () {
      localStorage.removeItem(this.sessionKey);
      this.dispatchEvent(new CustomEvent(
        "sessionCleared",
        {
          bubbles: true,
          cancelable: true
        }
      ));
    };

    HTMLAudioElement.prototype.initSaveSession = function () {
      if (this.saveSession) {
        this.addEventListener('play', this.retrieveSession);
        this.addEventListener('timeupdate', this.storeSession);
        this.addEventListener('seeked', this.storeSession);
        this.addEventListener('ended', this.clearSession);

        this.dispatchEvent(new CustomEvent(
          "sessionSaveActivated",
          {
            bubbles: true,
            cancelable: true
          }
        ));
      } else {
        this.clearSession();
        this.removeEventListener('play', this.retrieveSession);
        this.removeEventListener('timeupdate', this.storeSession);
        this.removeEventListener('seeked', this.storeSession);
        this.removeEventListener('ended', this.clearSession);

        this.dispatchEvent(new CustomEvent(
          "sessionSaveDeActivated",
          {
            bubbles: true,
            cancelable: true
          }
        ));
      }
    };

    var audioElements = document.getElementsByTagName("audio"),
      audioElementsCount = audioElements.length,
      audioElement;
    while (audioElementsCount > 0) {
      audioElementsCount -= 1;
      audioElements[audioElementsCount].initSaveSession();
    }
  }
}());