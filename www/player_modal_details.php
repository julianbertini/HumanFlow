<?php
      require 'vendor/autoload.php'; // include composer's autoloader
      $conn = new MongoDB\Client('mongodb://localhost');
      $db = $conn->tennis;
      $collection = $db->players;
      $playerId = $_GET['id'];
      $player = $collection->findOne(['_id' => new MongoDB\BSON\ObjectId($playerId)]);
      echo "<ul> 
              <li>Name: $player[name]</li> 
              <li>Hand: $player[hand]</li> 
              <li>Height: $player[height]</li> 
              <li>Country: $player[country]</li> 
              <li>Rank: $player[rank]</li> 
            <ul/>";
  ?>
