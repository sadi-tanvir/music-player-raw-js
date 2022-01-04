const music = document.querySelector('audio');
const img = document.querySelector('img');
const play = document.getElementById('play');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const currentTimeProgress = document.getElementById('currentTime');
const songDuration = document.getElementById('duration');
const progressDiv = document.getElementById('progressDiv')
const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');


let playing = false // is play
let indexOfSong = 0; // index of music


// music info Array
const songs = [
    {
        name: 'm-1',
        title: 'm-1 nashid',
        artist: 'Hujaifa'
    },
    {
        name: 'm-2',
        title: 'm-2 nashid',
        artist: 'Hujaifa'
    },
    {
        name: 'm-3',
        title: 'm-3 nashid',
        artist: 'Hujaifa'
    },
    {
        name: 'm-4',
        title: 'm-4 nashid',
        artist: 'Hujaifa'
    }
]

// by default play
music.src = `music/${songs[3].name}.mp3`
img.src = `images/${songs[3].name}.png`
title.textContent = songs[3].title
artist.textContent = songs[3].artist
currentTimeProgress.textContent = `0:00`
songDuration.textContent = `0:12`




// music play or pause and some other functionality 
const playMusic = () => {
    music.play()
    play.classList.replace('fa-play', 'fa-pause')
    img.classList.add("animate")
    playing = true
}
const stopMusic = () => {
    music.pause()
    playing = false
    play.classList.replace("fa-pause", "fa-play")
    img.classList.remove("animate")
}

addEventListener('keypress', (event) => {
    if (event.key == " ") {
        !playing ? playMusic() : stopMusic()
    }
})

play.addEventListener('click', () => {
    !playing ? playMusic() : stopMusic()
})


// update music duration & current time & volume
music.addEventListener('timeupdate', (event) => {
    // console.log(event.target.volume = .5); volume configaration
    const { currentTime, duration } = event.target;
    const progressTime = (currentTime / duration) * 100;
    if (progressTime) {
        currentTimeProgress.textContent = `${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60) < 10 ? '0' + Math.floor(currentTime % 60) : Math.floor(currentTime % 60)}`
        songDuration.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`
        progress.style.width = `${progressTime}%`
    }

    if (currentTime == duration) {
        stopMusic()
        nextSongs()
    }
})


// update progress bar with click
progressDiv.addEventListener('click', (event) => {
    let clickVal = event.offsetX;
    let totalVal = event.target.clientWidth;

    music.currentTime = (clickVal / totalVal) * music.duration

})



// change songs (next or previous)
next.addEventListener('click', nextSongs)
prev.addEventListener('click', preSongs)
// load Song
const loadSongs = (songs) => {
    title.textContent = songs.title
    artist.textContent = songs.artist
    music.src = `music/${songs.name}.mp3`
    img.src = `images/${songs.name}.png`
}
// next song
function nextSongs() {
    indexOfSong = (indexOfSong + 1) % songs.length
    loadSongs(songs[indexOfSong])
    music.play()
    play.classList.replace('fa-play', 'fa-pause')
    img.classList.add("animate")
}
// previous song
function preSongs() {
    indexOfSong = (indexOfSong - 1 + songs.length) % songs.length
    loadSongs(songs[indexOfSong])
    music.play()
    play.classList.replace('fa-play', 'fa-pause')
    img.classList.add("animate")
}
