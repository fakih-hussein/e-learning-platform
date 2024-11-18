<?php
include"connection.php";

$username=$_POST["username"];
$password=$_POST["password"];

$user_type_id=3;
$query=$connection->prepare("INSERT INTO users(username, password,user_type_id) values(?,?,?)");
$query->bind_param("ssi",$username,$password,$user_type_id);
$query->execute();

$result=$query->affected_rows;
if($result != 0){
    echo json_encode([
        "status"=>"Successful",
        "message"=>"$result user got registered"
    ]);
}else{
    echo json_encode([
        "status"=>"Failed",
        "message"=>"Could not register the user"
    ]);
}

?>