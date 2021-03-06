//author: @rafaelleru

const {ipcRenderer} = require('electron');

var currentPlayingFile;

function Updater(){
    this.list = [];
    this.list_div = document.getElementById('songs_queue');
};


Updater.prototype.reloadList = function(files, n_torrent){
    console.log(files.length.toString() + ' archivos del torrent: '+ n_torrent.toString());

    for(var i=0; i < files.length; i++){

        var list_element = document.createElement('li');
        list_element.setAttribute('id', 'item_'+ i.toString() + '_' + n_torrent.toString());

        if(files[i].name.includes('mp3',files[i].name.length - 4)){
            list_element.innerHTML=files[i].name;
            this.list_div.appendChild(list_element);
        }

	(function (i){
	    list_element.onclick = function(){
		requestPlay(i, n_torrent-1);
	    };
	})(i);

    }
};

Updater.prototype.updateProgress = function(n_torrent){
     //Refrescar el progreso del torrent
     document.getElementById('progress-bar').style.width = n_torrent+"%";

};

function requestPlay(i, n_torrent){
    console.log('request_play');
    currentPlayingFile = i;
    ipcRenderer.send('getPlayData', [i, n_torrent]);
}


Updater.prototype.play = function (file){
    console.log(file);
    var stream  = file;
    console.log(stream.data());
}

module.exports = Updater;
