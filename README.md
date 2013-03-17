# MediaSession

## What is it?
MediaSession saves the time-location of MediaElements (&lt;audio&gt; & &lt;video&gt;) and gives you the ability to restore it.

## Browser Support
MediaSession relies on **HTMLMediaElement** ([like Audio][canIuseAudio]) and [*localStorage*][canIuseStorage], only browsers that implement these specs are supported

[![browser support](http://ci.testling.com/jcsrb/mocha-testling-ci-example.png)](http://ci.testling.com/jcsrb/mocha-testling-ci-example)

## Usage

you can use this automatically or manually depending  on your needs:

### Automatic activation
add `session` to your `<audio>` element like this:

```html
<audio controls session>
      <source src="source.mp3" type="audio/mpeg" />
      <source src="source.ogg" type="audio/ogg" />
</audio>
```

### JavaScript

```javascript
  var myAudioElement = document.getElementsByTagName("audio")[0]; // get your audio element
  new MediaSession(me); // create a new MediaSession and pass the element to the constructor
  
  // or  
  var ms = new MediaSession();      // create a new MediaSession 
  ms.attachElement(myAudioElement); // and attach it afterwards
```
### Callbacks
for better integration in your project, MediaSession provides a set of callbacks triggered at various points:

* `onStore` is fired when the current position has been stored (fires often)
* `onRetrieve` is fired when the stored position has been applied to the audio element
* `onClear` is fired when the the session key has been removed from storage

```javascript
  var myAudioElement = document.getElementsByTagName("audio")[0]; // get your audio element  
  myAudioElement.saveSession.onStore : function () { /* my callback */ }; 
  myAudioElement.saveSession.onRetrieve : function () { /* my callback */ }; 
  myAudioElement.saveSession.onClear : function () { /* my callback */ }; 
```
## Limitations

### HTML 5 Validation
as described in the [Usage Section](#usage), MediaSession implicit activation relies on custom element attributes  (`session` and `autorestore`) and validators don't like that.

If you insist on spotless validation, rename all instances to  the `data-` equivalent

### Storage Key
The default Storage Key is build from the source URL of the file, this has the side effect that if you have the same audio file on multiple sub-pages it continues from where it left of.


## Testing
### Local
Test a done using [Testem][testem] with a [Chai][chai] favoured cup of [Mocha][mocha] 
### Continuous Integration and Browser Support
Remote testing is done using [Testling-CI][testling]

## Further Plans
* Integrate with popular media polyfills
* Bookmarklet

## Thanks to
* [Upfront Podcast][upfront] for the demo audio files
* [Ben][ben] and [Daryl][daryl] for input on JS Best Practices
* [Mark McDonnell][integralist] for his [DOM-Builder][domb]

## License
MIT, see the [LICENSE](LICENSE) for details



[canIuseAudio]: http://caniuse.com/audio
[canIuseStorage]: http://caniuse.com/namevalue-storage
[upfront]: http://upfrontpodcast.com
[ben]: https://github.com/benhowdle89
[daryl]: https://github.com/daryl
[integralist]: https://github.com/Integralist
[domb]: https://github.com/Integralist/DOM-Builder
[testem]: https://github.com/airportyh/testem
[mocha]: http://visionmedia.github.com/mocha/
[chai]: http://chaijs.com/
[testling]: https://ci.testling.com/