<?php

//header for localhost access
header("Access-Control-Request-Method: *");
header("Access-Control-Request-Headers: *");
header("Access-Control-Allow-Origin: *");

//read data from .csv file
$phone_list = readCSVFile("data.csv");

//sort data in php
sortPhonesByMakeAndModel($phone_list);

//response 
echo json_encode($phone_list);




/*
*
* function to sort phones by make and model
*/
function sortPhonesByMakeAndModel(&$phones_array){
	// Obtain a list of columns
	foreach ($phones_array as $key => $row) {
    	$make_list[$key]  = $row['make'];
    	$model_list[$key] = $row['model'];
	}

	// Sort the phone_list with make asc, model asc
	array_multisort($make_list, SORT_ASC, $model_list, SORT_ASC, $phones_array);
}

/*
*
* function to read data from csv file
*/
function readCSVFile($filename) {

	//extract data from the database
	$file = fopen($filename,"r");


	//reading each line
	$row=0;
	$phones_array = [];	
	while (($line = fgetcsv($file)) !== FALSE) {
		$row++;
		if($row==1) //ignore first line
			continue;

		$single_phone["code"] = $line[0];
		$single_phone["make"] = $line[1];
		$single_phone["model"] = $line[2];
		$single_phone["name"] = $line[3];
		$single_phone["type"] = $line[4];
		$single_phone["tar_code"] = $line[5];
		$single_phone["tar_name"] = $line[6];
		$single_phone["tar_minutes"] = $line[7];
		$single_phone["tar_sms"] = $line[8];
		$single_phone["tar_data"] = $line[9];

		array_push($phones_array,$single_phone);
	}
	fclose($file);
	return $phones_array;
}

/*
*
* function to read data from mysql database (not used)
*/
function readMYSQLDB() {

	$servername = "localhost";
	$username = "username";
	$password = "password";
	$dbname = "dbname";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	}
	// query statment for extracting data (assuming information is stored in a single table (shouldn't be!))
	$sql = "SELECT code, make, model, name, type, tar_code, tar_name, tar_minutes, tar_sms, tar_data FROM phone ORDER BY make ASC, model ASC";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	        echo $row;
	    }
	} else {
	    echo "0 results";
	}
	$conn->close();
}
?>