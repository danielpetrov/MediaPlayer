var allAudioPaths = [],
	allImagePaths = []
    PATH_URL = 'media/',
	audio = document.getElementById("audio"),
	image = document.getElementById("image"),
	ul = document.getElementById("listOfMusic"),
	progress = document.getElementById("progress"),
	audioProgress = 0,
	audioCurrentTime = 0,
	progressMax = 200,
	currentSongPlaying = 0;
	
audio.addEventListener("canplay", playAudio);

audio.addEventListener("progress", progressBar);

audio.addEventListener('durationchange', function(e) {
    progressMax = e.target.duration;
});

function playAudio(ev){
	ev.target.play();
}
function progressBar(){
	audioCurrentTime = (audioProgress/progressMax) * 100;
	progress.style.width = "" + audioCurrentTime + "%";
}

request.get("server.php", {}, success);

function success(data){
	data = JSON.parse(data);
	addDataToDom(data);
}

function addDataToDom(data){
	var _id = 0;
	for(element in data){
		var album = data[element]['album'],
			artist = data[element]['artist'],
			img = data[element]['image'],
			song = data[element]['song'];
		
		
		allAudioPaths.push(PATH_URL + data[element]['path']);
		allImagePaths.push(PATH_URL + img);
		
		var info = document.createElement('span'),
			container = document.createElement('li'),
			playButton = document.createElement('button'),
			stopButton = document.createElement('button');
		
		info.innerHTML += (_id + 1) + ". " + album + " - " + song;;
		info.className += " col-md-8";
		
		playButton.innerHTML = 'Play';
		playButton.value = _id;
		playButton.className += "";
		playButton.className += "pull-right glyphicon glyphicon glyphicon-play";
		
		stopButton.innerHTML = 'Pause';
		stopButton.value = _id++;
		stopButton.className += "Pause ";
		stopButton.className += "pull-right glyphicon glyphicon-pause";
		
		
		ul.appendChild(container);
		container.appendChild(info);
		container.appendChild(playButton);
		container.appendChild(stopButton);
	}
}

 
document.body.addEventListener("click", startPlaying);

var isStarted = false,
	audioInterval;

function startPlaying(ev){
	if(ev.target.tagName == "BUTTON"){
		
		if(ev.target.innerHTML.indexOf("Play") != -1){
			image.src = allImagePaths[ev.target.value];
			audio.src = allAudioPaths[ev.target.value];
			
			if(currentSongPlaying != ev.target.value){
				audioProgress = 0;
			}
			
			currentSongPlaying = ev.target.value;
			audio.currentTime = audioProgress;
			
			if(!isStarted){
				audioInterval = setInterval(function(){
				audioProgress += 1;
				}, 1000);
				isStarted = true;
			}
			
			audio.play();
		} else {
			isStarted = false;
			audio.pause();
			clearInterval(audioInterval);
		}
	}
}

