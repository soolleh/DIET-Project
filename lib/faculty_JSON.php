<?php
	header("Content-Type: application/json");
	require_once("config.php");
	$jsonData='{';
	$sqlString = "SELECT * FROM facultydetails ORDER BY serial_no";
	$query = mysqli_query($dbc,$sqlString) or die ('{"error":{"errorText":"Could not connect to MYSQL Datbase and hence no data received MYSQL error : '.mysqli_error($dbc).'"}}');  
	$i = 0;
	while ($row = mysqli_fetch_array($query)) 
	{	$i++;
		$jsonData .= '"official'.$i.'":'
		.'{ "s_no":"'.$row['serial_no'].'",'
		.'"official_name":"'.$row['official_name'].'",'
		.'"gender":"'.$row['gender'].'",'
		.'"designation":"'.$row['designation'].'"'.','
		.'"qualification":"'.$row['qualification'].'"'.','
		.'"department":"'.$row['department'].'"'
		.'},';	
	}
    $jsonData = chop($jsonData, ",");
	$jsonData .= '}';
	echo $jsonData;    
?>