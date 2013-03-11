var should = chai.should();
var expect = chai.expect;

describe('MediaSession', function () { 
  
  it('should be defined', function () {
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

    it("should have a retrieve function", function() {      
      expect(mediaSession).to.respondTo('retrieve');
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
      var ms = new window.MediaSession(me);                
      //ms.sessionKey.should.be.
    });
  });
});


