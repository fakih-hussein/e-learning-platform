<?php
include "connection.php";

$user_type_id=3;
$query = $connection->prepare("SELECT * FROM users WHERE user_type_id=?");
$query->bind_param("i",$user_type_id);

$query->execute();
$result = $query->get_result();

if($result->num_rows>0){
    $array=[];
    while($resultObject=$result->fetch_assoc()){
        $array[]=$resultObject;
    }
    echo json_encode($array);
}else{
    $response = [
        "message"=>"Empty Results"
    ];
    echo json_encode($response);
}
?>