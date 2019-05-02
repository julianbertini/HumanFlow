<table class="table table-hover table-responsive" id="data-table">
        <thead>
        <tr>
            <th scope="col">
                <input class="form-control match-winner" type="text" value="" placeholder="Filter winner"> 
                <div class="dropdown" >
                    <button disabled class="btn btn-secondary  filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Winner
                    </button>
            </th>
            <th scope="col"> 
                <input class="form-control match-loser" type="text" value="" placeholder="Filter loser"> 
                <div class="dropdown" >
                    <button disabled class="btn btn-secondary filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Loser
                    </button>
                </div>
            </th>
            <th scope="col"> 
                <input class="form-control match-score" type="text" value="" placeholder="Filter score"> 
                <div class="dropdown" >
                    <button disabled class="btn btn-secondary filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Score
                    </button>
                </div>
            </th>
            <th scope="col">
                <input class="form-control match-winner-seed" type="text" value="" placeholder="Filter winner seed"> 
                <div class="dropdown" >
                    <button disabled class="btn btn-secondary filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Winner Seed
                    </button>
                </div>
            </th>
            <th scope="col">
                <input class="form-control match-loser-seed" type="text" value="" placeholder="Filter loser seed"> 
                <div class="dropdown" >
                    <button disabled class="btn btn-secondary filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Loser Seed
                    </button>
                </div>
            </th>
            <th scope="col">
                <input class="form-control match-tourney" type="text" value="" placeholder="Filter tournament"> 
                <div class="dropdown" >
                    <button disabled class="btn btn-secondary filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Tournament
                    </button>
                </div>
            </th>
          </tr>
        </thead>
        <tbody class="player-table-body">
          <?php
            require 'vendor/autoload.php'; // include composer's autoloader
            $conn = new MongoDB\Client('mongodb://localhost');
            $db = $conn->tennis;
            $matchCollection = $db->matches;
            $playerCollection = $db->players;
            $tourneyCollection = $db->tourneys;
            $tuple_count = 0;

            $matches = $matchCollection->find();   
  
              foreach ($matches as $match) {
                $tuple_count++;
                $winner = $playerCollection->findOne(['_id' => $match['winner']]);
                $loser = $playerCollection->findOne(['_id' => $match['loser']]);
                $tourney = $tourneyCollection->findOne(['_id' => $match['tourney']]);
                
                if ($tuple_count > 100) {
                  break;
                }
                echo "<tr class='match-tuple'> <td class='winner-td'> <a class='player-info' data-toggle='modal' data-target='#exampleModal' href='#' data-id=$match[winner]>$winner[name]</a> </td> <td class='loser-td'> <a class='player-info' data-toggle='modal' data-target='#exampleModal' href='#' data-id=$match[loser]>$loser[name]</a> </td> <td class='score-td'>$match[score]</td> <td class='winner-seed-td'>$match[winnerSeed]</td> <td class='loser-seed-td'>$match[loserSeed]</td> <td class='tourney-td'> <a class='tourney-info' data-toggle='modal' data-target='#exampleModal' href='#' data-id=$match[tourney]>$tourney[name]</a> </td></tr>";
              }
          ?>                                      
  </tbody>
</table>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Done</button>
      </div>
    </div>
  </div>
</div>
