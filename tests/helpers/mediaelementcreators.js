function createVideo(wrapperId, autorestore) {
  return createMedia(wrapperId, "video", demoVideoSrc, autorestore);
}

function createAudio(wrapperId, autorestore) {
  return createMedia(wrapperId, "audio", demoAudioSrc, autorestore);
}

function mapSources (sources, sourceElements) {
  var count = sourceElements.length;
  while (count > 0) {
    count -= 1;
    sourceElements[count].setAttribute("src", sources[count].src);
    sourceElements[count].setAttribute("type", sources[count].mime);
  }
}

function createMedia(wrapperId, elementTagName, sources, autorestore) {
  autorestore = !!autorestore;
  var structure = DOM.init(
    DOM.el('div#' + wrapperId).content(
      DOM.el(elementTagName)
    )
  ),
    mediaElement = structure.querySelector(elementTagName),
    sourcesNodes = [],
    count = sources.length;
  mediaElement.setAttribute("controls", '');
  mediaElement.setAttribute("session", '');  

  if (autorestore) {
    mediaElement.setAttribute("autorestore", '');
  }

  while (count > 0) {
    count -= 1;
    mediaElement.appendChild(DOM.init(DOM.el('source')));
  }

  var sourceElements = structure.querySelectorAll("source");
  mapSources(sources, sourceElements);

  return structure;
}

