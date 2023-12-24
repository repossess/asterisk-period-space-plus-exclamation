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
      
      <script>
       
        var all_songs = <?php 

            $file_list = glob('playlists/*');
            $playlists = array();

            foreach($file_list as $file_name){
                if ( is_file($file_name) ){
                    $playlist = [];
                    $playlist["id"] = substr($file_name, 10);
                    $playlist["title"] = substr($file_name, 10);
                    $playlist["artwork"] = 'https://i1.sndcdn.com/artworks-F7Y1vv07Mp1rYDn4-CIhyeA-t500x500.jpg';
                    
                    array_push($playlists, $playlist);
                }   
            }
            
            echo json_encode($playlists);
        ?>
      </script>
      <script src = 'playlists.js'></script>
