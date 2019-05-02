<table class="table table-hover table-responsive" id="data-table">
        <thead>
        <tr>
            <th scope="col"> 
                <input class="form-control tourney-name" type="text" value="" placeholder="Filter name"> 
                <div class="dropdown" >
                    <button disabled class="btn btn-secondary filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Name
                    </button>
                </div>
            </th>
            <th scope="col">
                <input class="form-control tourney-surface" type="text" value="" placeholder="Filter surface"> 
                <div class="dropdown" >
                    <button disabled class="btn btn-secondary filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Surface
                    </button>
                </div>
            </th>
            <th scope="col">
                <input class="form-control tourney-date" type="text" value="" placeholder="Filter date"> 
                <div class="dropdown" >
                    <button disabled class="btn btn-secondary filter_button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Date
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
            $collection = $db->tourneys;
            $tuple_count = 0;

            $tourneys = $collection->find();

            foreach ($tourneys as $tourney) {
              $tuple_count++;
              if ($tuple_count > 100) {
                break;
              }
              echo "<tr class='tourney-tuple'> <td class='tourney-name-td'>$tourney[name]</td> <td class='surface-td'>$tourney[surface]</td> <td class='date-td'>$tourney[date]</td>";
            }
          ?>                                      
        </tbody>
      </table>