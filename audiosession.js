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
      audioElementsCount = audioElements.length;
    while (audioElementsCount > 0) {
      audioElementsCount -= 1;
      audioElements[audioElementsCount].initSaveSession();
    }
  }
}());