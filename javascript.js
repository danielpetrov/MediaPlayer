var allAudioPaths = [],
    PATH_URL = 'media/';

var getData = $.get( "server.php", 
	success
);

function success(data){
	//debugger;
	data = JSON.parse(data);
	addDataToDom(data);
}

function addDataToDom(data){
	var _id = 1;
	
	for(element in data){
		var album = data[element]['album'],
		artist = data[element]['artist'],
		img = data[element]['image'],
		song = data[element]['song'];
		
		
		allAudioPaths.push(data[element]['path']);
		
		dom = document.createElement('div'),
		image = document.createElement('img'),
		audio = document.createElement('audio'),
		audioSource = document.createElement('source'),
		container = document.createElement('div'),
		button = document.createElement('button');
		
		dom.innerHTML += album;
		dom.innerHTML += song;
		
		image.src = PATH_URL + img;
		image.style.width = 200 + 'px';
		image.style.height = 200 + 'px';
		
		//audioSource.src = PATH_URL + audioPath;
		audioSource.type = 'audio/mpeg';
		audio.id = 'song' + _id;
		audio.appendChild(audioSource);
		audio.addEventListener("canplay", playAudio);
		
		button.innerHTML = 'Play';
		button.style.display = 'block';
		button.value = _id++;
		
		document.body.appendChild(container);
		container.appendChild(dom);
		container.appendChild(image);
		
		container.appendChild(button);
		container.appendChild(audio);
	}
}
//debugger;
document.body.addEventListener("click", startPlaying);

function playAudio(ev){
	ev.target.play();
}

function startPlaying(ev){
	var audioElement = ev.target.nextSibling;
	audioElement.src = PATH_URL + allAudioPaths[ev.target.value];
}