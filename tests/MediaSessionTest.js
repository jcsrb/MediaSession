var should = chai.should();
var expect = chai.expect;

describe('MediaSession', function () {
  var MediaSession = window.MediaSession;
  it('should be defined', function () {
    expect(MediaSession).to.be.a('function');
  });

});

describe('Audio Prototype', function () {
  it('should have a session attribute', function () {
    audioElement.saveSession.should.not.be.null;
  });

});

describe('Audio Instance', function () {
  var audioInstance = new Audio;
  it('should do what?', function () {
    // test!    
  });
});

