# AudioSession

we all have been there: you are listening to a podcast on a website and you accidentally close the tab. You can reopen the tab, but if you didn't pay close attention to the timer, finding the right place again can be tricky. __AudioSession__ is here to fix just that!

## What is it?
AudioSession is an extension of the [HTMLAudioElement][HAEdoc] prototype that keeps track of __&lt;audio&gt;__  `currentTime` and saves it to __localStorage__ to be able to retrieve it on the next play, regardless of page reload. 
Works great with `autoplay` and has no issues with `loop`


## Usage

you can use this automatically or manually depending  on your needs:

### Automatic activation
add `save-session` to your `<audio>` element like this:

```html
<audio controls save-session>
      <source src="source.mp3" type="audio/mpeg" />
      <source src="source.ogg" type="audio/ogg" />
</audio>
```

### JavaScript activation

```javascript
  var myAudioElement = document.getElementsByTagName("audio")[0]; // get your audio element
  myAudioElement.saveSession = true; // activate AudioSession
  myAudioElement.saveSession = false; // deactivate AudioSession
```
### Custom Events
for better integration in your project, AudioSession provides a set of custom events triggered at various points:

* `sessionStored` is fired when the current position has been stored (fires often)
* `sessionRestored` is fired when the stored position has been applied to the audio element
* `sessionCleared` is fired when the the session key has been removed from storage
* `sessionSaveActivated` is fired when AudioSession has been activated
* `sessionSaveDeActivated` is fired when AudioSession has been deactivated

## Browser Support
as AudioSession relies on [Audio][canIuseAudio] and [localStorage][canIuseStorage], only browsers that implement these specs are supported

in development AudioSession has been tested on:
* Chrome 25
* Firefox 19

## Limitations

### HTML 5 Validation
as described in the [Usage Section](#usage), AudioSession can be activated using the element property `save-session`.
If you are keen on spotless validation, rename all instances of `save-session` to `data-save-session`

### Session Key
The Session Key is build from the source URL of the file, this has the side effect that if you have the same audio file on multiple sub-pages it continues from where it left of.

It's either a bug or a feature depends on how you see it.
You can use this side effect to keep music continuing, when going to the next page.
If you don't want this to happen, use a unique ID for each &lt;audio&gt; element, and a include it in the _sessionKey_.

## Further Plans
* check compatibility with popular polyfills
* add tests
* annotate source
* apply functions to HTMLMediaElement therefore supporting both Audio and Video(?)


## Thanks to
* [Upfront Podcast][upfront] for the demo audio files
* [Ben][ben] and [Daryl][daryl] for input on JS Best Practices

## License
MIT, see the file for details



[HAEdoc]: https://developer.mozilla.org/en-US/docs/DOM/HTMLAudioElement
[canIuseAudio]: http://caniuse.com/audio
[canIuseStorage]: http://caniuse.com/namevalue-storage
[upfront]: http://upfrontpodcast.com
[ben]: https://github.com/benhowdle89
[daryl]: https://github.com/daryl