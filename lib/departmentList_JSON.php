<?php
	header("Content-Type: application/json");
	require_once("mysqlConnect3.php");
	$jsonData='{';
	$sqlString = "SELECT * FROM departments ORDER BY serial_no";
	$query = mysqli_query($dbc,$sqlString) or die ('{"error":{"errorText":"Could not connect to MYSQL Datbase and hence no data received MYSQL error : '.mysqli_error($dbc).'"}}'); 
	$i = 0;
	while ($row = mysqli_fetch_array($query)) 
	{	$i++;
		$jsonData .= '"department'.$i.'":'
		.'{ "s_no":"'.$row['serial_no'].'",'
		.'"department_id":"'.$row['department_id'].'",'
		.'"department_name":"'.$row['department_name'].'"'.','
		.'"hod_name":"'.$row['hod_name'].'"'
		.'},';	
	}
    $jsonData = chop($jsonData, ",");
	$jsonData .= '}';
	echo $jsonData;    
?>