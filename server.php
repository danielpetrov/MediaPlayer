<?php
$playlist = require_once 'songs.php';

$json = json_encode($playlist);

echo $json;
