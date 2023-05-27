const music = document.getElementById("music")
const left = document.getElementById("left")
const right = document.getElementById("right")
const play =  document.getElementById("play")
const pause = document.getElementById("pause")
const album = document.getElementById("album")
const range = document.getElementById("range")
const volumeX = document.getElementById("volume_x")
const volume = document.getElementById("volume")
const time = document.getElementById("time")
const time1 = document.getElementById("time1")
const volume_range = document.getElementById("volume_range")
const musicname  = document.getElementById("musicname")
const body = document.getElementById("body");
const artist = document.getElementById("artist")

let i = 0;
let count = 0;
let rotationInterval;

const songs = [
  {
    name: "Getmə",
    artist : "Jeyhun Semedov",
    path: "audio/Jeyhun Samedov- Getme mp3 yukle.mp3",
    cover: "maxredsdefault.jpg",
  },
    {
      name: "Tufan Var",
      artist : "Jeyhun Semedov",
      path: "audio/Jeyhun Samedov  Tufan Var.mp3",
      cover: "tufan.jpg",
    },
    {
      name: "Belki",
      artist : "Dedublüman",
      path: "audio/[YT2mp3.info] - Dedublüman - Belki - Akustik (Lyric Video) (320kbps).mp3",
      cover: "20221013-dedubluman-belki-sarki-sozleri-oldurdum-cicegimi-sarki-sozleri-372994-a597b489e5d0e3ed5efa.jpg",
    },
    {
      name: "Sənə Bu Ayrılıq",
      artist : "Mikope",
      path: "audio/[YT2mp3.info] - Mikope — Sənə bu ayrılıq (320kbps).mp3",
      cover: "400x400bb.jpg",
    },
  ];

  const musicAbout = () => {
    musicname.textContent = songs[count].name;
    artist.textContent = songs[count].artist
    album.setAttribute("src", songs[count].cover);
  };
  const addMusic = () => {
    music.src = songs[count].path;
    musicAbout();
  };
  

  window.addEventListener("load", () => {
    addMusic();
    music.addEventListener("loadedmetadata", () => {
      const totalMinutes = Math.floor(music.duration / 60).toString().padStart(2, '0');
      const totalSeconds = Math.floor(music.duration % 60).toString().padStart(2, '0');
      time1.textContent = `${totalMinutes}:${totalSeconds}`;
    });

    music.addEventListener("timeupdate", () => {
      const currentMinutes = Math.floor(music.currentTime / 60).toString().padStart(2, '0');
      const currentSeconds = Math.floor(music.currentTime % 60).toString().padStart(2, '0');
      time.textContent = `${currentMinutes}:${currentSeconds}`;
    });

    const musicTime = () => {
      const totalSeconds = Math.floor(music.duration);
      const currentSeconds = Math.floor(music.currentTime);
      const remainingSeconds = totalSeconds - currentSeconds;
    
      const remainingMinutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
      const remainingSecondsFormatted = (remainingSeconds % 60).toString().padStart(2, '0');
    
      time1.textContent = `${remainingMinutes}:${remainingSecondsFormatted}`;
    };
    
    setInterval(musicTime, 100);
    
    
  });


play.addEventListener("click",()=> {
    music.play()
    play.style.display = "none"
    pause.style.display = "block"
    rotationInterval = setInterval(() => {
        i++
        album.style.transform = `rotate(${i}deg)`
    }, 100)
    
})

right.addEventListener("click", () => {
  count++;
  if (count >= songs.length) {
    count = 0; 
  }
  music.src = songs[count].path; 
  addMusic()
  music.play()
  play.style.display = "none"
  pause.style.display = "block"
  
});

left.addEventListener("click",()=>{
  count--;
  if (count >= songs.length) {
    count = 0; 
  }
  music.src = songs[count].path; 
  addMusic()
  music.play()
})

pause.addEventListener("click",()=> {
    music.pause()
    play.style.display = "block"
    pause.style.display = "none"
    clearInterval(rotationInterval)
   
})
music.addEventListener("ended", function() {
    music.pause();
  });
  

music.addEventListener("timeupdate", () => {
  range.value = music.currentTime;
  pauseMusic()
});

music.addEventListener("loadedmetadata", () => {
    range.setAttribute("min", 0);
    range.setAttribute("max", music.duration);
    
    
  });
  
  range.addEventListener("input", () => {
    music.currentTime = range.value;
  });
  
  const updateRangeBackground = () => {
    const percentage = (music.currentTime / music.duration) * 100;
    range.style.background = `linear-gradient(to right, #2bcbd4 0%, #2bcbd4 ${percentage}%, #f2f2f2 ${percentage}%, #f2f2f2 100%)`;
  };
  
  music.addEventListener("timeupdate", updateRangeBackground);
  
  const pauseMusic = () => {
    if (music.currentTime == music.duration) {
      music.pause();
      play.style.display = "block";
      pause.style.display = "none";
      i = 0;
      album.style.transform = `rotate(${i}deg)`
      clearInterval(rotationInterval);
    }
  };


volume_range.addEventListener("input", () => {
  music.volume = volume_range.value / 10;
});

volume.addEventListener("click", () => {
  music.volume = 1;
  volume.style.display = "block";
  volume_range.style.display = "block";
  volume_range.value = music.volume * 10;
  volumeX.style.display = "block";
});

volumeX.addEventListener("click", () => {
  music.volume = 0.0;
  volume.style.display = "block";
  volumeX.style.display = "none";
  volume_range.style.display = "none";
});



  
  
  
