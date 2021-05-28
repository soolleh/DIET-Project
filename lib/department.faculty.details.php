<?php
	header("Content-Type: application/json");
	require_once("mysqlConnect3.php");
	$jsonData='{';
	function xss_clean($data)
{
$data =	str_replace("'","",$data);
$data =	str_replace("-","",$data);
$data =	str_replace("OR 1=1","",$data);
$data =	str_replace("or 1=1","",$data);
$data =	str_replace("Or 1=1","",$data);
$data =	str_replace("oR 1=1","",$data);
$data =	str_replace("OR","",$data);
$data =	str_replace("or","",$data);
$data =	str_replace("Or","",$data);
$data =	str_replace("oR","",$data);
$data =	str_replace("script","",$data);



return $data;
}

	$url =  xss_clean(htmlspecialchars(ucwords($_GET["department_id"])));
	$sqlString = "SELECT * FROM teaching_faculty_details WHERE department = '$url' ";
	$query = mysqli_query($dbc,$sqlString) or die ('{"error":{"errorText":"Could not connect to MYSQL Datbase and hence no data received MYSQL error : '.'"}}'); 
	$i = 0;
	$row_cnt = mysqli_num_rows($query);
		while ($row = mysqli_fetch_array($query)) 
	{	
		$i++;
		$jsonData .= '"official'.$i.'":'
		.'{ "official_name":"'.$row['official_name'].'",'
		.'"no_of_officials":"'.$row_cnt.'"'
		.'},';	
	}
    $jsonData = chop($jsonData, ",");
	$jsonData .= '}';
	echo $jsonData; 

   
?>