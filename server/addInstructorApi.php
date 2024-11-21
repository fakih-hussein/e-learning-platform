<?php
include"connection.php";

$input = json_decode(file_get_contents("php://input"), true);
$username = $input['username'] ?? null;
$password = $input['password'] ?? null;


// $hashed = password_hash($password,PASSWORD_DEFAULT);

$user_type_id=2;
$query=$connection->prepare("INSERT INTO users(username,password,user_type_id) VALUES (?,?,?)");
// $query->bind_param("ssi",$username,$hashed,$user_type_id);
$query->bind_param("ssi",$username,$password,$user_type_id);
$query->execute();

$result = $query->affected_rows;
if($result != 0){
    echo json_encode([
        "status"=>"Successful",
        "message"=>"$result instructor added"
    ]);
}else{
    echo json_encode([
        "status"=>"Failed",
        "message"=>"Could not add the instructor"
    ]);
}

?>