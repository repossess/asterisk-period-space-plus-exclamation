var audio_controller = document.getElementById('controller');
    
    function addNewTrack(obj) {
          const trackCard = document.createElement('div');
          
          trackCard.classList.add('track-card');
          trackCard.innerHTML = '<img style="border-radius: 8px" src="' + obj.artwork + '"><h3>' + obj.title + '</h3><p>' + obj.artist + '</p><div class="play-button-overlay" id="' + obj.id + '"></div>';

          const trackRows = document.querySelectorAll('.track-row');
          const latestTrackRow = trackRows[trackRows.length - 1];

          if (latestTrackRow && latestTrackRow.children.length < 6) {
            latestTrackRow.appendChild(trackCard);
          } else {
            const newTrackRow = document.createElement('div');
            newTrackRow.classList.add('track-row');
            newTrackRow.appendChild(trackCard);

            const latestTracksSection = document.getElementById('tracks');
            latestTracksSection.appendChild(newTrackRow);
          }
        }
        
        const audio = document.getElementById('controller');
        const playButton = document.querySelector('.play-button');
        const progressBar = document.querySelector('.progress-bar');
        const fullBar = document.getElementById('clickbar');
        const currentTime = document.querySelector('.current-time');
        
        let isPlaying = false;
        var current_song = 0;
        var current_song_index = 0;
        var playlist_mode = false
        var playlist = []
        
        function togglePlay() {
          if (isPlaying) {
            audio.pause();
            isPlaying = false
          } else {
            audio.play();
            isPlaying = true
          }
        }
        
        function find_song_index(song_id){
            for(let i = 0; i < all_songs.length; i++) {
                let obj = all_songs[i];
                if (obj.id == current_song){
                    return i
                }
            }
        }
        
        function updateProgressBar() {
          const percent = (audio.currentTime / audio.duration) * 100;
          progressBar.style.width = `${percent}%`;
        
          const currentMinutes = Math.floor(audio.currentTime / 60);
          const currentSeconds = Math.floor(audio.currentTime % 60);

          const durationMinutes = Math.floor(audio.duration / 60);
          const durationSeconds = Math.floor(audio.duration % 60);
          
          currentTime.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
          
          if (percent === 100){
            var next_song = {}  
              
            if (shuffle_mode){
                next_song = all_songs[Math.floor(Math.random()*all_songs.length)];
            } else {
                next_song = all_songs[find_song_index(current_song) + 1]
            }
            
            if (!playlist_mode){document.title = next_song.artist + " - " + next_song.title}
            if (shuffle_mode){document.title = '(*) ' + document.title}
            audio_controller.src = 'https://github.com/repossess/soundcloud2/raw/main/' + next_song.file_name
            audio_controller.load()
            audio_controller.play()
            current_song = next_song.id
            current_song_index = find_song_index(current_song)
            isPlaying = true
          }
        }
        
        function setProgressBar(e) {
          const width = this.clientWidth;
          const clickX = e.offsetX;
          const duration = audio.duration;
          audio.currentTime = (clickX / width) * duration;
        }
        
        fullBar.addEventListener('click', setProgressBar);
                
        audio.addEventListener('timeupdate', updateProgressBar);
        
        for(let i = 0; i < all_songs.length; i++) {
            let obj = all_songs[i];
        
            addNewTrack(obj)
            document.getElementById(obj.id.toString()).addEventListener('click', function(){
                if (playlist_mode) {
                    playlist.push(obj)
                    document.title = '*. +! ( ' + playlist.length.toString()  + ' )'
                    return true;
                }
                
                audio_controller.src = 'https://github.com/repossess/soundcloud2/raw/main/' + obj.file_name
                audio_controller.load()
                audio_controller.play()
                current_song = obj.id
                current_song_index = find_song_index(current_song)
                document.title = obj.artist + " - " + obj.title
                if (shuffle_mode){document.title = '(*) ' + document.title}
                isPlaying = true
            })
        }
        
        window.addEventListener('keydown', function(e) {
          if(e.code == 'Space' && e.target == document.body) {
            e.preventDefault();
          }
        });
        
        document.addEventListener('keyup', event => {
          if (event.code === 'Space') {
            togglePlay()
          }
        })
