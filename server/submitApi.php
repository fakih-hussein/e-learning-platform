<?php

include "connection.php";
require "./../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "SecretKey";
$headers = getallheaders();
$jwt = $headers["Authorization"];

$key = new Key($secretKey, "HS256");
$payload = JWT::decode($jwt, $key);

if ($payload->userType != 3) {


    http_response_code(401);

    echo json_encode([
        "message" => "Unauthorized"
    ]);

    return;
}

$assignment = $_POST["assignment_id"];
$attachement = $_POST["attachement"];
$id = $payload->userId;

$query = $connection->prepare("INSERT INTO student_assignments(users_id,assignment_id,attachement) VALUES(?,?,?)");
$query->bind_param("iis",$id,$assignment,$attachement);
$query->execute();

$result = $query->affected_rows;
if ($result != 0) {
    echo json_encode([
        "status" => "Successful",
        "message" => "$result enrolled"
    ]);
} else {
    echo json_encode([
        "status" => "Failed",
        "message" => "error enrolling"
    ]);
}
