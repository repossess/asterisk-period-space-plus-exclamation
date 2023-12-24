<?php

$file = fopen("playlists/".$_GET['title'], "w") or die("Unable to open file!");
fwrite($file, substr($_GET['data'],1,-1));
fclose($file);

?>
