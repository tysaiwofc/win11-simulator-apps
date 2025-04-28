document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.querySelector('.play-btn');
    const playBtnMain = document.querySelector('.play-btn-main');
    const progressBar = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-bar');
    const volumeBar = document.querySelector('.volume-level');
    const volumeContainer = document.querySelector('.volume-bar');
    const currentTimeEl = document.querySelector('.time-current');
    const totalTimeEl = document.querySelector('.time-total');
    const songActive = document.querySelector('.song.active');
    
    // Set total time
    audioPlayer.addEventListener('loadedmetadata', function() {
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
    });
    
    // Play/Pause button functionality
    function togglePlay() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
            playBtnMain.innerHTML = '<i class="fas fa-pause"></i>';
            songActive.classList.add('playing');
        } else {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
            playBtnMain.innerHTML = '<i class="fas fa-play"></i>';
            songActive.classList.remove('playing');
        }
    }
    
    playBtn.addEventListener('click', togglePlay);
    playBtnMain.addEventListener('click', togglePlay);
    
    // Progress bar update
    audioPlayer.addEventListener('timeupdate', function() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
    });
    
    // Click on progress bar to seek
    progressContainer.addEventListener('click', function(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    });
    
    // Volume control
    volumeContainer.addEventListener('click', function(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const volume = clickX / width;
        audioPlayer.volume = volume;
        volumeBar.style.width = `${volume * 100}%`;
    });
    
    // Set initial volume
    audioPlayer.volume = 0.7;
    
    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Song click functionality
    songActive.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
            playBtnMain.innerHTML = '<i class="fas fa-pause"></i>';
            this.classList.add('playing');
        } else {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
            playBtnMain.innerHTML = '<i class="fas fa-play"></i>';
            this.classList.remove('playing');
        }
    });
    
    // When song ends
    audioPlayer.addEventListener('ended', function() {
        playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
        playBtnMain.innerHTML = '<i class="fas fa-play"></i>';
        songActive.classList.remove('playing');
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    });
});