function createVideo(wrapperId){
	var structure = DOM.init(
    DOM.el('div#video-test-wraper').content(
        DOM.el('p').content('abc'),
        DOM.el('p').content('def')
    )    
	);
	return structure;
}

function createAudio(wrapperId){
	var structure = DOM.init(
    DOM.el('div#audio-test-wraper').content(
        DOM.el('p').content('abc'),
        DOM.el('p').content('def')
    )    
	);
	return structure;
}