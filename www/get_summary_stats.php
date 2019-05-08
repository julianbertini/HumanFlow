<?php
$mysqli = new mysqli("localhost", "root", "1Q3&5j6789", "project_human_flow2");

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$response = array();
$stat = array();
$filename = "stat_results.json";

if (!file_exists($filename)) {
    $res = $mysqli->query("select tracer.ssid_id, ssid.ssid_name,  tracer.MAC_hash,location.building, from_unixtime(time_stamp) as time from ssid, (select * from probes group by ssid_id) as tracer,
    location where location.id = tracer.loc_id and tracer.ssid_id = ssid.id order by time_stamp;");
    for ($row_no = 0; $row_no < $res->num_rows - 1; $row_no++) {
        $res->data_seek($row_no);
        $row = $res->fetch_assoc();

        $ssid = $row['ssid_id'];
        $ssid_name = $row['ssid_name'];
        $mac = $row['MAC_hash'];
        $loc_id = $row['building'];
        $time = $row['time'];

        $values[] = array('ssid' => $ssid, 'ssid_name' => $ssid_name, 'mac' => $mac, 'loc_id' => $loc_id, 'time' => $time);
    }

    $response["statResults"] = $values;

    $fp = fopen('stat_results.json', 'w');
    fwrite($fp, json_encode($response));
    fclose($fp);
}

readfile("stat_results.json");

?>                                 
