<?php
$mysqli = new mysqli("localhost", "root", "password", "project_human_flow");

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$response = array();
$hourlyValues = array();

$res = $mysqli->query("SELECT location.building as building, MONTH(from_unixtime(time_stamp)) as month, DAY(from_unixtime(time_stamp)) as day, HOUR(from_unixtime(time_stamp)) as hour,
                        count(MAC_hash) as counter FROM probes, location where location.id = probes.loc_id group by building, month, day, hour;");
for ($row_no = 0; $row_no < $res->num_rows - 1; $row_no++) {
    $res->data_seek($row_no);
    $row = $res->fetch_assoc();

    $count = $row['counter'];
    $day = $row['day'];
    $hour = $row['hour'];
    $building = $row['building'];
    $month = $row['month'];

    $hourlyValues[] = array('building' => $building, 'month' => $month, 'day' => $day, 'hour' => $hour, 'count' => $count);
}

$response["houryValues"] = $hourlyValues;

$fp = fopen('results.json', 'w');
fwrite($fp, json_encode($response));
fclose($fp);

readfile("results.json");

?>