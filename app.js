
var kan_songs = [
  { id:0,name: "Song 1", image: "music/img/music1.jpg", url: "music/music1/music1.mp3" },
  { id:1,name: "Song 2", image: "music/img/music2.jpg", url: "music/music1/music2.mp3" },
  { id:2,name: "Song 3", image: "music/img/music3.jpg", url: "music/music1/music3.mp3" },
  { id:3,name: "Song 4", image: "music/img/music4.jpg", url: "music/music1/music4.mp3" },
  { id:4,name: "Song 5", image: "music/img/music5.jpg", url: "music/music1/music5.mp3" }
];

var eng_songs =[
  { id:5,name: "Song 6", image: "music/img/music6.jpg", url: "music/music1/music6.mp3" },
  { id:6,name: "Song 7", image: "music/img/music7.jpg", url: "music/music1/music7.mp3" },
  { id:7,name: "Song 8", image: "music/img/music8.jpg", url: "music/music1/music8.mp3" },
  { id:8,name: "Song 9", image: "music/img/music9.jpg", url: "music/music1/music9.mp3" },
  { id:9,name: "Song 10", image: "music/img/music10.jpg", url: "music/music1/music10.mp3" }
];

var hin_songs =[
  { id:10,name: "Song 11", image: "music/img/music11.jpg", url: "music/music1/music11.mp3" },
  { id:11,name: "Song 12", image: "music/img/music12.jpg", url: "music/music1/music12.mp3" },
  { id:12,name: "Song 13", image: "music/img/music13.jpg", url: "music/music1/music13.mp3" },
  { id:13,name: "Song 14", image: "music/img/music14.jfif", url: "music/music1/music14.mp3" },
  { id:14,name: "Song 15", image: "music/img/music15.jfif", url: "music/music1/music15.mp3" }
]

var currentIndex = 0;
var currentSong = null;
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const image = document.getElementById("playPauseImage");
document.getElementById("forward-button").addEventListener("click", forwardSong);
document.getElementById("backward-button").addEventListener("click", backwardSong);


button1.addEventListener("click", function() {
  createSongList(kan_songs);
});

button2.addEventListener("click", function() {
  createSongList(eng_songs);
});

button3.addEventListener("click", function() {
  createSongList(hin_songs);
});


function createSongList(songs) {
  var songContainer = document.getElementById("song-container");

  songContainer.innerHTML = "";
  songs.forEach(function(song) {
    var img = document.createElement("img");
    img.src = song.image;
    img.alt = song.name;
    img.className = "song-image";
    img.addEventListener("click", function() {
      playSong(song.url,song.id);
      image.src = "music/logos/pause-button.png";
    });

    songContainer.appendChild(img);
  });
}


function playSong(songUrl,index) {
  if (currentSong !== null) {
    currentSong.pause();
    currentSong.currentTime = 0;
    clearInterval(currentSong.progressInterval);
  }
  //var audio = new Audio(songs[Index]);
  var audio = new Audio(songUrl);
  audio.play();

  audio.progressInterval = setInterval(function() {
    var progress = document.getElementById("song-progress");
    progress.value = (audio.currentTime / audio.duration) * 100;

    if (audio.ended) {
      clearInterval(audio.progressInterval);
    }
  }, 500);
  console.log(index);
  currentSong = audio;
  currentIndex = index;

function forwardSong(event, progressBar) {
    var progressRect = progressBar.getBoundingClientRect();
    var progressBarWidth = progressRect.width;
    var clickOffsetX = event.clientX - progressRect.left;
    var targetTime = (clickOffsetX / progressBarWidth) * currentSong.duration;
  
    currentSong.currentTime = targetTime;
  }
  
  var progressBar = document.getElementById("song-progress");
  
  progressBar.addEventListener("click", function(event) {
    forwardSong(event, progressBar);
  });

  currentSong = audio;
}

function forwardSong() {
 if(currentIndex<=4)
 {
  currentIndex = (currentIndex + 1) % kan_songs.length;
  findurl(currentIndex);
  }
  else if(currentIndex <=9)
  {
    var length=kan_songs.length+eng_songs.length;
    currentIndex = (currentIndex + 1) % length;
    findurl(currentIndex);
  }
  else
  {
    var length=kan_songs.length+eng_songs.length+hin_songs.length;
    console.log(length);
    currentIndex = (currentIndex + 1) % length;
    findurl(currentIndex);
  }
}

function backwardSong() {
  if(currentIndex<=4)
  {   
  currentIndex = (currentIndex - 1 + kan_songs.length) % kan_songs.length;
  findurl(currentIndex);
   }
   else if(currentIndex <=9)
   {
     var length=kan_songs.length+eng_songs.length;
     currentIndex = (currentIndex - 1 + length) % length;
     findurl(currentIndex);
   }
   else 
   {
     var length=kan_songs.length+eng_songs.length+hin_songs.length;
     currentIndex = (currentIndex - 1 + length) % length;
     findurl(currentIndex);
   }
} 

function findurl(currentIndex){
  if(currentIndex<=4)
  {
    var song = kan_songs.find(song => song.id === currentIndex);
    playSong(song.url,song.id);
  }
  else if(currentIndex <=9)
  {
    var song = eng_songs.find(song => song.id === currentIndex);
    playSong(song.url,song.id);
  }
  else 
  {
    var song = hin_songs.find(song => song.id === currentIndex);
    playSong(song.url,song.id);
  }
}

function toggleSong() {
  if (currentSong !== null) {
    if (currentSong.paused) {
      currentSong.play();
      image.src = "music/logos/pause-button.png";
    } else {
      currentSong.pause();
      image.src = "music/logos/play-button.png";
    }
  }
}

createSongList(kan_songs);