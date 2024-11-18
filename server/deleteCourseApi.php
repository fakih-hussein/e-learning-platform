<?php
include"connection.php";

$course=$_POST["course_title"];

$query=$connection->prepare("DELETE FROM courses WHERE course_title=?");
$query->bind_param("s",$course);
$query->execute();

$result = $query->affected_rows;
if($result != 0){
    echo json_encode([
        "status"=>"Successful",
        "message"=>"$result course deleted"
    ]);
}else{
    echo json_encode([
        "status"=>"Failed",
        "message"=>"Could not delete course"
    ]);
}

?>