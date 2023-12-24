<html lang="en">
   <head>
      <meta charset="UTF-8">
      <title>*. +!</title>
      <link rel="stylesheet" href="styles.css">
   </head>
   
   <body>
      <header class="navbar">
         <div class="container">
            <h1>*. +!</h1>
            <nav>
            <ul>
              <li><a href="?playlist=likes">Likes</a></li>
              <li><a href="playlists.php">Playlists</a></li>
            </ul>
          </nav>
         </div>
      </header>
      
      <main class="container">
         <section class="tracks" id="tracks">
         </section>
      </main>
      
      <div class="audio-controller">
         <div class="audio-player">
            <div class="audio-progress" id='clickbar'>
               <div class="progress-bar"></div>
            </div>
            
            <div class="audio-time">
                <span class="current-time"></span>
            </div>
         </div>
         <audio id="controller" src=""></audio>
      </div>
      
      <script>
       
        var all_songs = []
          all_songs = <?php readfile("./playlists/".$_GET['playlist']); ?>
          
          
          var playlist = []
          var playlist_mode = false
          var shuffle_mode = false

          function find_song_index(){}
          
          document.addEventListener('keyup', event => {
              if (event.keyCode === 80) {
                playlist_mode = !playlist_mode;
                
                if ( playlist_mode ){
                    document.title = '*. +! ( ' + playlist.length.toString()  + ' )'
                } else {
                    if (playlist.length > 0) {
                        document.location = "https://ambien.000webhostapp.com/create_playlist.php?title=" + prompt('Please title your new playlist:') + "&data='" + encodeURIComponent(JSON.stringify(playlist)) + "'"
                        playlist = []
                    }
                    
                    var current_song = all_songs[find_song_index(current_song)]
                    document.title = current_song.artist + " - " + current_song.title
                }
              } else if (event.keyCode === 83) {
                  shuffle_mode = !shuffle_mode
                  if (shuffle_mode){document.title = '(*) ' + document.title}else{
                      document.title = document.title.substring(4)
                  }
              }
            })
      </script>
      <script src = 'loader.js'></script>
