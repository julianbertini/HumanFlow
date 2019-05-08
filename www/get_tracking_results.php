<?php
$mysqli = new mysqli("localhost", "root", "1Q3&5j6789", "project_human_flow2");

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$response = array();
$values = array();
$filename = "tracking_results.json";


$ssid_name = $_GET['ssid'];


$res = $mysqli->query("select * from ssid where ssid.ssid_name = \"{$ssid_name}\" limit 1;");
$row_no = 0;
$res->data_seek($row_no);
$row = $res->fetch_assoc();
$ssid = $row['id'];

if ($res->num_rows  > 0) {
    
    $res = $mysqli->query("select from_unixtime(time_stamp) as time, loc_id, distance, MAC_hash from probes where ssid_id = \"{$ssid}\" order by time asc");

    for ($row_no = 0; $row_no < $res->num_rows - 1; $row_no++) {
        $res->data_seek($row_no);
        $row = $res->fetch_assoc();

        $loc_id = $row['loc_id'];
        if ($loc_id == 0) {
            $building = "Libs";
        } else if ($loc_id == 1) {
            $building = "Chambers";
        } else if ($loc_id == 2) {
            $building = "Wall";
        } else {
            $building = "Union";
        }

        $distance = $row['distance'];
        $mac = $row['MAC_hash'];
        $time = $row['time'];

        $values[] = array('building' => $building, 'distance' => $distance, 'mac' => $mac, 'time' => $time);
    }
}

$response["trackValues"] = $values;

$fp = fopen('tracking_results.json', 'w');
fwrite($fp, json_encode($response));
fclose($fp);

readfile("tracking_results.json");

?>