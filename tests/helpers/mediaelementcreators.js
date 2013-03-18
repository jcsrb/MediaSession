function createVideo(wrapperId, autorestore){
  return createMedia(wrapperId, "video", demoVideoSrc, autorestore);
}

function createAudio(wrapperId, autorestore){  
  return createMedia(wrapperId, "audio", demoAudioSrc, autorestore);
} 

function createMedia(wrapperId, elementTagName, sources, autorestore){
  var autorestore = !!autorestore;
  
  var structure = DOM.init(
    DOM.el('div#'+wrapperId).content(
      DOM.el(elementTagName)
    )              
  );


  var mediaElement = structure.querySelector(elementTagName);
  mediaElement.setAttribute("controls", '');
  mediaElement.setAttribute("session", '');
  if(autorestore){
    mediaElement.setAttribute("autorestore", '');
  }

  var sourcesNodes = [];
  var count = sources.length;  
  while (count > 0) {
      count -= 1;      
      mediaElement.appendChild(DOM.init(DOM.el('source')));                
  }
     
  var sourceElements = structure.querySelectorAll("source");
  mapSources(sources,sourceElements);

  
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