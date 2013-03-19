var should = chai.should();
var expect = chai.expect;

describe('Module', function () { 
  it('should exist', function () {
    MediaSession.should.be.ok;
  });      
  it("should have the name 'MediaSession'", function() {          
    MediaSession.name.should.equal('MediaSession');          
  });
});  

describe("Initalization", function() {    
  beforeEach(function () {
    var structure = createAudio("audio-test-wraper");
    document.body.appendChild(structure);
  });       
  afterEach(function () {
    var structure = document.getElementById('audio-test-wraper');
    structure.parentNode.removeChild(structure);
  });     

  it("should work via contructor", function() {      
    var me = document.querySelector('audio');        
    var ms = new window.MediaSession(me);                
    ms.mediaElement.should.equal(me);
    me.session.should.equal(ms);
  });

  it("should work via attachElement", function() {      
    var me = document.querySelector('audio');        
    var ms = new window.MediaSession();
    ms.attachElement(me);
    ms.mediaElement.should.equal(me);
    me.session.should.equal(ms);
  });

  it('should work via autoApply', function(){
    MediaSession.autoApply();
    var me = document.querySelector('audio');        
    me.session.should.be.ok;
  });

  it('should throw error on non-MediaElements', function(){
    var me = document.querySelector('div');                    
    expect( function(){ var ms = new window.MediaSession(me); } ).to.throw(Error);
  });

  it('should ignore elements without the session attirbiute when running autoApply', function(){
    var me = document.querySelector('audio');        
    me.removeAttribute("session");
    MediaSession.autoApply();    
    expect(me.session).to.not.exist;    
  });

  it('should build a sessionKey', function(){
    MediaSession.autoApply();
    var me = document.querySelector('audio');            
    console.log(me.currentSrc);
    expect(me.session.sessionKey).to.contain(me.currentSrc);
  });
  
});

describe('Functions', function () {  
    beforeEach(function () {
      var structure = createAudio("audio-test-wraper");
      document.body.appendChild(structure);
    });  
    afterEach(function () {
      var structure = document.getElementById('audio-test-wraper');
      structure.parentNode.removeChild(structure);
    });       

    it('should store the current time');
    it('should not store the current time if paused');
    it('should restore the time on demand');
    it('should restore the time automaticaly (autorestore)');     
    it('should restore to 0 if no storage is found');
    it('should cleanup on end');
});

describe('Events', function () {
  beforeEach(function () {
    var structure = createAudio("audio-test-wraper");
    document.body.appendChild(structure);
  });  
  afterEach(function () {
    var structure = document.getElementById('audio-test-wraper');
    structure.parentNode.removeChild(structure);
  });     

  it('should hook canplay if autorestore is selected');    
  it('should hook ended unless loop is selected');    
  it('should hook timeupdated');    
});

describe('Callbacks', function () {
  beforeEach(function () {
    var structure = createAudio("audio-test-wraper");
    document.body.appendChild(structure);
  });   
  afterEach(function () {
    var structure = document.getElementById('audio-test-wraper');
    structure.parentNode.removeChild(structure);
  });   

  it('should fire onStore after Store');
  it('should fire onRestore after restore');
  it('should fire onClear after clear');
  it('should fire onEnd after end');

  
});