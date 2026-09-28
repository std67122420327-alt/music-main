const songs = [
    { title: "1. Deja Vu - RESCENE", src: "music/rescene deja-vu.mp3" },
    { title: "2. Mister - BLINGONE", src: "music/BLINGONE (블링원) – 미스터 (Mister) __ easy lyrics.mp3" },
    { title: "3. Born - DODREE", src: "music/DODREE Born (本) Lyrics (Color Coded Lyrics).mp3" },
    { title: "4. HAWWAH - DODREE", src: "music/dodree (도드리) – HAWWAH (夏渦) __ easy lyrics.mp3" },
    { title: "5. Line", src: "music/Line.mp3" },
    { title: "6. LOST", src: "music/LOST.mp3" },
    { title: "7. House Party - VVUP", src: "music/VVUP (비비업) ‘House Party’ Dance Lyric Video.mp3" }
];

const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const stopBtn = document.getElementById('stop-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const songTitle = document.getElementById('song-title');
const playlistList = document.getElementById('playlist-list');

let currentSongIndex = 0;
let isPlaying = false;

// โหลดรายการเพลงลง Playlist
function loadPlaylist() {
    playlistList.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-music"></i> <span>${song.title}</span>`;
        li.onclick = () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        };
        playlistList.appendChild(li);
    });
}

// โหลดข้อมูลเพลง
function loadSong(index) {
    const song = songs[index];
    songTitle.innerHTML = song.title;
    audioPlayer.src = song.src;
    
    // อัปเดตไฮไลต์สีใน Playlist
    document.querySelectorAll('#playlist-list li').forEach((li, i) => {
        li.classList.toggle('playing', i === index);
    });
}

// เล่นเพลง (Play)
function playSong() {
    isPlaying = true;
    playPauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    audioPlayer.play();
}

// พักเพลง (Pause)
function pauseSong() {
    isPlaying = false;
    playPauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
    audioPlayer.pause();
}

// หยุดเพลง (Stop)
function stopSong() {
    isPlaying = false;
    playPauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
    audioPlayer.pause();
    audioPlayer.currentTime = 0; 
}

// กดปุ่ม Play/Pause
playPauseBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

// กดปุ่ม Stop
stopBtn.addEventListener('click', stopSong);

// เปลี่ยนเพลง ก่อนหน้า-ถัดไป
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// เล่นเพลงถัดไปอัตโนมัติเมื่อจบเพลง
audioPlayer.addEventListener('ended', nextSong);

// ฟอร์แมตเวลาแสดงผล
function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// อัปเดตหลอดเวลาตอนเพลงกำลังเล่น
audioPlayer.addEventListener('timeupdate', (e) => {
    const { currentTime, duration } = e.srcElement;
    
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeEl.innerText = formatTime(currentTime);
    
    if (duration) {
        totalTimeEl.innerText = formatTime(duration);
    }
});

// คลิกที่หลอดเวลาเพื่อกรอเพลง
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
});

// เริ่มต้นโปรแกรมเมื่อเปิดเว็บ
loadPlaylist();
loadSong(currentSongIndex);