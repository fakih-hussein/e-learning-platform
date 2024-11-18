<?php
include"connection.php";

$username=$_POST["username"];

$status="banned";
$query=$connection->prepare("UPDATE users 
                                SET status=?
                                WHERE username=? ");
$query->bind_param("ss",$status,$username);
$query->execute();

$result = $query->affected_rows;
if($result != 0){
    echo json_encode([
        "status"=>"Successful",
        "message"=>"$result user got banned"
    ]);
}else{
    echo json_encode([
        "status"=>"Failed",
        "message"=>"Could not ban the user"
    ]);
}

?>