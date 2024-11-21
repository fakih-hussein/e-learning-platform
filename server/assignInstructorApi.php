<?php
include"connection.php";

$username=$_POST["username"];
$course=$_POST["course_title"];

$query=$connection->prepare("UPDATE courses 
                                SET instructor_id=(
                                SELECT id 
                                FROM users 
                                WHERE username=?)
                                WHERE course_title=? ");
$query->bind_param("ss",$username,$course);
$query->execute();

$result = $query->affected_rows;
if($result != 0){
    echo json_encode([
        "status"=>"Successful",
        "message"=>"$result instructor assigned"
    ]);
}else{
    echo json_encode([
        "status"=>"Failed",
        "message"=>"Could not assign the instructor"
    ]);
}

?>