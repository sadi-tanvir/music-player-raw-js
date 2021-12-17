const music = document.querySelector('audio');
const img = document.querySelector('img');
const play = document.getElementById('play');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let playing = false

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
    }
]

// by default play
music.src = `music/${songs[0].name}.mp3`
img.src = `images/${songs[0].name}.png`
title.textContent = songs[0].title
artist.textContent = songs[0].artist



// music play or pause and some other functionality 
play.addEventListener('click', () => {
    if (!playing) {
        music.play()
        play.classList.replace('fa-play', 'fa-pause')
        img.classList.add("animate")
        playing = true
    } else {
        music.pause()
        playing = false
        play.classList.replace("fa-pause", "fa-play")
        img.classList.remove("animate")
    }
})

const loadSongs = (songs) => {
    title.textContent = songs.title
    artist.textContent = songs.artist
    music.src = `music/${songs.name}.mp3`
    img.src = `images/${songs.name}.png`
}

let indexOfSong = 0;

next.addEventListener('click', nextSongs)
prev.addEventListener('click', preSongs)

function nextSongs() {
    indexOfSong = (indexOfSong + 1) % songs.length
    loadSongs(songs[indexOfSong])
    music.play()
    play.classList.replace('fa-play', 'fa-pause')
    img.classList.add("animate")
}

function preSongs() {
    indexOfSong = (indexOfSong - 1 + songs.length) % songs.length
    loadSongs(songs[indexOfSong])
    music.play()
    play.classList.replace('fa-play', 'fa-pause')
    img.classList.add("animate")
}
