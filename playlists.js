
    function addNewTrack(obj) {
          const trackCard = document.createElement('div');
          
          trackCard.classList.add('track-card');
          trackCard.innerHTML = '<img style="border-radius: 8px" src="' + obj.artwork + '"><h3>' + obj.title + '</h3><p>*. +!</p><div class="play-button-overlay" id="' + obj.id + '"></div>';

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

        for(let i = 0; i < all_songs.length; i++) {
            let obj = all_songs[i]

            addNewTrack(obj)
            document.getElementById(obj.id.toString()).addEventListener('click', function(){
                document.location = 'https://ambien.000webhostapp.com/?playlist=' + obj.id
            })
        }
