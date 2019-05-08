<?php
$mysqli = new mysqli("localhost", "root", "1Q3&5j6789", "project_human_flow2");

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$response = array();
$hourlyValues = array();
$filename = "movement_results.json";

if (!file_exists($filename)) {
    $res = $mysqli->query("SELECT MAC_hash, MONTH(from_unixtime(time_stamp)) as month, DAY(from_unixtime(time_stamp)) as day, HOUR(from_unixtime(time_stamp)) as hour,
    MINUTE(from_unixtime(time_stamp/900)) as minute, location.building, ssid.id as s1, ssid.ssid_name as s2 FROM probes, location, ssid where MAC_hash = \"f4:0f:24:0a:7c:45\"
    and  ssid_id = \"150\" and location.id = probes.loc_id and ssid.id = probes.ssid_id group by month, day, hour, minute,loc_id, s1,s2;");
    for ($row_no = 0; $row_no < $res->num_rows - 1; $row_no++) {
        $res->data_seek($row_no);
        $row = $res->fetch_assoc();

        $mac = $row['MAC_hash'];
        $day = $row['day'];
        $hour = $row['hour'];
        $building = $row['building'];
        $month = $row['month'];

        $hourlyValues[] = array('building' => $building, 'month' => $month, 'day' => $day, 'hour' => $hour, 'mac' => $mac);
    }

    $response["hourlyValues"] = $hourlyValues;

    $fp = fopen('movement_results.json', 'w');
    fwrite($fp, json_encode($response));
    fclose($fp);
}

readfile("movement_results.json");

?>