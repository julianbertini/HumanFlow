<?php
      require 'vendor/autoload.php'; // include composer's autoloader
      $conn = new MongoDB\Client('mongodb://localhost');
      $db = $conn->tennis;
      $collection = $db->tourneys;
      $tourneyId = $_GET['id'];
      $tourney = $collection->findOne(['_id' => new MongoDB\BSON\ObjectId($tourneyId)]);
      echo "<ul> 
              <li>Name: $tourney[name]</li> 
              <li>Surface: $tourney[surface]</li> 
              <li>Date: $tourney[date]</li> 
            <ul/>";
  ?>
