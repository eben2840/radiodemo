


///// carousels /////////////////

const carousels = [...document.querySelectorAll('.carousel img')];
let carouselImageIndex = 0;

const changeCarousel = () => {
    carousels[carouselImageIndex].classList.toggle('active');

    if (carouselImageIndex >= carousels.length - 1) {
        carouselImageIndex = 0;
    } else {
        carouselImageIndex++;
    }

    carousels[carouselImageIndex].classList.toggle('active');
};

setInterval(() => {
    changeCarousel();
}, 3000);

/////////////// toggling music player ///////////////

const musicPlayerSection = document.querySelector('.music-player-section');

let clickCount = 1;

musicPlayerSection.addEventListener('click', () => {
    if (clickCount >= 2) {
        musicPlayerSection.classList.add('active');
        clickCount = 1;
        return;
    }
    clickCount++;
    setTimeout(() => {
        clickCount = 1;
    }, 250);
});

/////// back from music player

const backToHomeBtn = document.querySelector('.music-player-section .back-btn');
backToHomeBtn.addEventListener('click', () => {
    musicPlayerSection.classList.remove('active');
});

/// access playlist/////////

const playListSelection = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player-section .nav-btn');

navBtn.addEventListener('click', () => {
    playListSelection.classList.add('active');
});

///////// back from playlist to music player ///

const backToMusicPlayer = document.querySelector('.playlist .back-btn');

backToMusicPlayer.addEventListener('click', () => {
    playListSelection.classList.remove('active');
});

/////// navigation done ///

//// music ////

let currentMusic = 0;

const music = document.querySelector('#audio-source');
const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const queue = [...document.querySelectorAll('.queue')];

/// select all buttons here

const forwardBtn = document.querySelector('.fa-forward');
const backwardBtn = document.querySelector('.fa-backward');
const playBtn = document.querySelector('.fa-play');
const pauseBtn = document.querySelector('.fa-pause');
const repeatBtn = document.querySelector('.fa-redo');
const volumeBtn = document.querySelector('.fa-volume-up');

const volumeSlider = document.querySelector('.volume-slider');

/// playBtn click event

playBtn.addEventListener('click', () => {
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
});

/// pauseBtn click event

pauseBtn.addEventListener('click', () => {
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
});

/// function for setting up music

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;

    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
    currentMusicTime.innerHTML = '00 : 00';
    queue.forEach(item => item.classList.remove('active'));
    queue[currentMusic].classList.add('active');
};

setMusic(3);

// format duration in 00:00 format

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = '0' + min;
    }

    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = '0' + sec;
    }

    return `${min} : ${sec}`;
};

// seekbar event
setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) === Math.floor(seekBar.max)) {
        if (repeatBtn.classList.contains('active')) {
            setMusic(currentMusic);
            playBtn.click();
        } else {
            forwardBtn.click();
        }
    }
}, 500);

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
});

// forward btn

forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
});

/// backward btn

backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
});

// repeat button

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
});

// volume section

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
});

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
});

queue.forEach((item, i) => {
    item.addEventListener('click', () => {
        setMusic(i);
        playBtn.click();
    });
});






// const likeButtons = [...document.querySelectorAll('.like-button')];
// let likedTracks = new Set(); // To store the indices of liked tracks

// const toggleLike = (index) => {
//     if (likedTracks.has(index)) {
//         likedTracks.delete(index);
//         likeButtons[index].innerHTML = '<i class="far fa-heart"></i>';
//     } else {
//         likedTracks.add(index);
//         likeButtons[index].innerHTML = '<i class="fas fa-heart"></i>';
//     }
// };


// const likeButtons = [...document.querySelectorAll('.like-button')];

// const toggleLike = async (index) => {
//     const trackDiv = likeButtons[index].closest('.queue');
//     const trackIndex = trackDiv.getAttribute('data-track-index');

//     try {
//         const response = await fetch(`/like/${trackIndex}`, {
//             method: 'POST',
//         });

//         if (response.ok) {
//             const responseData = await response.json();
//             if (responseData.liked) {
//                 likeButtons[index].innerHTML = '<i class="fas fa-heart"></i>';
//             } else {
//                 likeButtons[index].innerHTML = '<i class="far fa-heart"></i>';
//             }
//         } else {
//             console.error('Failed to toggle like.');
//         }
//     } catch (error) {
//         console.error('An error occurred:', error);
//     }
// };

// const queueItems = document.querySelectorAll('.queue');

// function toggleLike(index) {
//     const queueItem = queueItems[index];
//     const liked = queueItem.getAttribute('data-liked') === 'true';
    
//     if (liked) {
//         queueItem.setAttribute('data-liked', 'false');
//         queueItem.querySelector('.like-button').classList.remove('liked');
//     } else {
//         queueItem.setAttribute('data-liked', 'true');
//         queueItem.querySelector('.like-button').classList.add('liked');
//     }
// }

// // You can also set initial liked state for certain songs
// queueItems[0].setAttribute('data-liked', 'true');
// queueItems[0].querySelector('.like-button').classList.add('liked');



function toggleLike(trackIndex) {
    fetch(`/toggle_like/${trackIndex}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update the like button icon
                const likeButton = document.querySelector(`.queue[data-track-index="${trackIndex}"] .like-button`);
                if (data.liked) {
                    likeButton.innerHTML = '<i class="fas fa-heart"></i>';
                } else {
                    likeButton.innerHTML = '<i class="far fa-heart"></i>';
                }
            }
        })
        .catch(error => console.error(error));
}
