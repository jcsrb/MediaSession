var should = chai.should();
var expect = chai.expect;

describe('MediaSession', function () { 
  
  it('should be defined', function () {
    MediaSession.should.be.a('function');
  });    
  describe("Prototype", function() {
    it("should have a name", function() {      
      MediaSession.name = 'MediaSession';
      MediaSession.name.should.equal('MediaSession');      
    });
  });

  describe("Instance", function() {

    var mediaSession = new window.MediaSession();

    it("should have a store function", function() {
      expect(mediaSession.store).to.be.a('function');
    });    

    it("should have a retrieve function", function() {
      expect(mediaSession.retrieve).to.be.a('function');
    });

    it("should have a clear function", function() {
      expect(mediaSession.clear).to.be.a('function');
    });

    describe("attaching a MediaElement", function() {      
      it("via contructor", function() {      
        var me = document.createElement("audio");          
        var ms = new window.MediaSession(me);        
        console.log(ms.mediaElement);
        console.log(me.session);
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
  });
});


