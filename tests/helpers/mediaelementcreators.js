function createVideo(wrapperId){
  return createMedia(wrapperId, "video", demoVideoSrc);
}

function createAudio(wrapperId){  
  return createMedia(wrapperId, "audio", demoAudioSrc);
} 

function createMedia(wrapperId, elementTagName, sources){
  
  var structure = DOM.init(
    DOM.el('div#'+wrapperId).content(
      DOM.el(elementTagName)
    )              
  );


  var mediaElement = structure.querySelector(elementTagName);
  mediaElement.setAttribute("controls", '');
  mediaElement.setAttribute("session", '');

  var sourcesNodes = [];
  var count = sources.length;  
  while (count > 0) {
      count -= 1;      
      mediaElement.appendChild(DOM.init(DOM.el('source')));                
  }
     
  var sourceElements = structure.querySelectorAll("source");
  mapSources(sources,sourceElements);

  console.log(mediaElement);
  return structure; 
}

function mapSources(sources, sourceElements){  
  var count = sourceElements.length;  
  while (count > 0) {
      count -= 1;                            
      sourceElements[count].setAttribute("src", sources[count].src);
      sourceElements[count].setAttribute("type", sources[count].mime);            
  }
}