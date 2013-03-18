var should = chai.should();
var expect = chai.expect;

describe('MediaSession', function () { 
  
  it('should exist', function () {
    MediaSession.should.be.ok;
  });      
  it("should have the name 'MediaSession'", function() {          
    MediaSession.name.should.equal('MediaSession');          
  });
  
  describe("Instance", function() {

    var mediaSession = new window.MediaSession();

    it("should have a store function", function() {      
      expect(mediaSession).to.respondTo('store');
    });    

    it("should have a restore function", function() {      
      expect(mediaSession).to.respondTo('restore');
    });

    it("should have a clear function", function() {      
      expect(mediaSession).to.respondTo('clear');
    });

    describe("attaching a MediaElement", function() {      
      it("via contructor", function() {      
        var me = document.createElement("audio");          
        var ms = new window.MediaSession(me);                
        ms.mediaElement.should.equal(me);
        me.session.should.equal(ms);
      });

      it("via attachElement", function() {      
        var me = document.createElement("audio");          
        var ms = new window.MediaSession();
        ms.attachElement(me);
        ms.mediaElement.should.equal(me);
        me.session.should.equal(ms);
      });

    });
    it('should have a sessionKey', function(){
      var me = document.createElement("audio");        
      me.setAttribute("src" , demoAudioSrc[0].src);      
      document.body.appendChild(me);
      var ms = new window.MediaSession(me);               
      //ms.sessionKey.should.be.
    });
  });
});


describe('DOM Interaction', function () {
  describe('Audio', function () {    
      beforeEach(function () {
        var structure = createAudio("audio-test-wraper");
        document.body.appendChild(structure);
      });        

      it('should do what...', function(){
        
      });

      afterEach(function () {
        var structure = document.getElementById('audio-test-wraper');
        structure.parentNode.removeChild(structure);
      }); 
  });  
  describe('Video', function () {    
      beforeEach(function () {
        var structure = createVideo("video-test-wraper");
        document.body.appendChild(structure);
      });        

      it('should do what...', function(){
        
      });

      afterEach(function () {
        var structure = document.getElementById('video-test-wraper');
        structure.parentNode.removeChild(structure);
      }); 
  });  
});



describe('Callbacks', function () {
  beforeEach(function () {
        var structure = createAudio("audio-test-wraper");
        document.body.appendChild(structure);
  });     
  it('should fire onStore after Store', function(){
    //should.equal(ms)
  });
  afterEach(function () {
      var structure = document.getElementById('audio-test-wraper');
      structure.parentNode.removeChild(structure);
  });   
});