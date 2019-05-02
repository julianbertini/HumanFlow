<table class="table table-hover table-responsive" id="data-table">
        <thead>
        <tr>
            <th scope="col">
                <input class="form-control player-name" type="text" value="" placeholder="Filter name"> 
                <div class="dropdown" >
                    <button class="btn btn-outline-secondary dropdown-toggle filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Name
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item sort-name-desc" href="#">Sort Desc</a>
                      <a class="dropdown-item sort-name-asc" href="#">Sort Asc</a>
                    </div>
                </div>
            </th>
            <th scope="col"> 
                <input class="form-control player-hand" type="text" value="" placeholder="Filter hand"> 
                <div class="dropdown" >
                    <button class="btn btn-outline-secondary dropdown-toggle filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Hand
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item sort-hand-desc" href="#">Sort Desc</a>
                      <a class="dropdown-item sort-hand-asc" href="#">Sort Asc</a>
                    </div>
                </div>
            </th>
            <th scope="col">
                <input class="form-control player-height" type="text" value="" placeholder="Filter height"> 
                <div class="dropdown" >
                    <button class="btn btn-outline-secondary dropdown-toggle filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Height
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item sort-height-desc" href="#">Sort Desc</a>
                      <a class="dropdown-item sort-height-asc" href="#">Sort Asc</a>
                    </div>
                </div>
            </th>
            <th scope="col">
                <input class="form-control player-country" type="text" value="" placeholder="Filter country"> 
                <div class="dropdown" >
                    <button class="btn btn-outline-secondary dropdown-toggle filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Country
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item sort-country-desc" href="#">Sort Desc</a>
                      <a class="dropdown-item sort-country-asc" href="#">Sort Asc</a>
                    </div>
                </div>
            </th>
            <th scope="col">
                <input class="form-control player-rank" type="text" value="" placeholder="Filter rank"> 
                <div class="dropdown" >
                    <button class="btn btn-outline-secondary dropdown-toggle filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Rank
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item sort-rank-desc" href="#">Sort Desc</a>
                      <a class="dropdown-item sort-rank-asc" href="#">Sort Asc</a>
                    </div>
                </div>
            </th>
          </tr>
        </thead>
        <tbody class="player-table-body">
          <?php
            require 'vendor/autoload.php'; // include composer's autoloader
            $conn = new MongoDB\Client('mongodb://localhost');
            $db = $conn->tennis;
            $collection = $db->players;
            $tuple_count = 0;

            if (isset($_GET['custom_search'])) {
              $playerName = $_GET['playerName'];
              $playerHand = $_GET['playerHand'];
              $playerHeight = $_GET['playerHeight'];
              $playerCountry = $_GET['playerCountry'];
              $playerRank = $_GET['playerRank'];

              $players = $collection->find([ 'name' => $playerName, 'hand' => $playerHand, 'height' => $playerHeight, 'country' => $playerCountry, 'rank' => $playerRank ]);

              foreach ($players as $player) {
                echo "<tr class='player-tuple'> <td class='name-td'>$player[name]</td> <td class='hand-td'>$player[hand]</td> <td class='height-td'>$player[height]</td> <td class='country-td'>$player[country]</td> <td class='rank-td'>$player[rank]</td></tr>";
              }
              
            } else {
              $players = $collection->find();
              
              // Our original idea was to display data in sets of 100 tuples,
              // allowing the user to move through each set, but we are only
              // going to display the first 100 values as a proof of concept.
              foreach ($players as $player) {
                $tuple_count++;
                if ($tuple_count > 100) {
                  break;
                } 
                echo "<tr class='player-tuple'> <td class='name-td'>$player[name]</td> <td class='hand-td'>$player[hand]</td> <td class='height-td'>$player[height]</td> <td class='country-td'>$player[country]</td> <td class='rank-td'>$player[rank]</td></tr>";
              }
            }
          ?>                                      
        </tbody>
      </table>