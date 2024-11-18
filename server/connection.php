<?php
$host = "localhost";
$username="root";
$pass="";
$dbname="e_learning_db";

$connection=new mysqli($host,$username,$pass,$dbname);
if($connection->connect_error){
    die("Connection Error");
}

?>