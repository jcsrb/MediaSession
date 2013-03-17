# MediaSession

## What is it?
MediaSession saves the time-location of MediaElements (&lt;audio&gt; & &lt;video&gt;) and gives you the ability to restore it.

## Browser Support
MediaSession relies on **HTMLMediaElement** ([like Audio][canIuseAudio]) and [localStorage][canIuseStorage], only browsers that implement these specs are supported.

[![browser support](http://ci.testling.com/jcsrb/mocha-testling-ci-example.png)](http://ci.testling.com/jcsrb/mocha-testling-ci-example)

## Usage

you can use this automatically or manually depending  on your needs:

### with Element Attributes 
add `session` to your `<audio>` element like this:

```html
<audio controls session>
      <source src="source.mp3" type="audio/mpeg" />
      <source src="source.ogg" type="audio/ogg" />
</audio>
```
for automatic restore also add `autorestore` to your `<audio>` element like this:

```html
<audio controls session autorestore>
      <source src="source.mp3" type="audio/mpeg" />
      <source src="source.ogg" type="audio/ogg" />
</audio>
```

### with JavaScript

```javascript
var myAudioElement = document.getElementsByTagName("audio")[0]; // get your audio element
new MediaSession(me); // create a new MediaSession and pass the element to the constructor
```
after initialization you can 

```javascript
myAudioElement.session.restore(); // move to last saved position
myAudioElement.session.end(); // disable and remove the media session
```



### Callbacks
for better integration in your project, MediaSession provides a set of callbacks triggered at various points:

* `onStore` is fired when the current position has been stored (fires often)
* `onRestore` is fired when the stored position has been applied to the audio element
* `onClear` is fired when the the session key has been removed from storage
* `onEnd` is fired when the the session key has been removed from storage

```javascript
var myAudioElement = document.getElementsByTagName("audio")[0]; // get your audio element  
myAudioElement.session.onStore : function () { /* my callback */ }; 
myAudioElement.session.onRestore : function () { /* my callback */ }; 
myAudioElement.session.onClear : function () { /* my callback */ }; 
myAudioElement.session.onEnd : function () { /* my callback */ }; 
```
## Limitations

### HTML5 Validation
as described in the [Usage Section](#usage), MediaSession implicit activation relies on custom element attributes  (`session` and `autorestore`) and validators don't like that. If you insist on spotless validation, rename all instances to  the `data-` equivalent.

### Storage Key
The default Storage Key is build from the source URL of the file, this has the side effect that if you have the same media file on multiple sub-pages it continues from where it left of.


## Testing
### Local
Test a done using [Testem][testem] with a [Chai][chai] favoured cup of [Mocha][mocha] 
### Continuous Integration and Browser Support
Remote testing is done using [Testling-CI][testling], see an example on how to do this [here](https://github.com/jcsrb/mocha-testling-ci-example)

## Further Plans
* Integrate with popular media polyfills
* Bookmarklet
* Nice Demo and GH-Page

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