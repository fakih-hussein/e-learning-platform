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

if ($payload->userType != 2) {


    http_response_code(401);

    echo json_encode([
        "message" => "Unauthorized"
    ]);

    return;
}

$course = $_POST["course_id"];
$student=$_POST["student_id"];
$id = $payload->userId;

$query = $connection->prepare("INSERT INTO invitations(instructor_id,course_id,student_id) VALUES(?,?,?)");
$query->bind_param("ssi", $id, $course,$student);
$query->execute();

$result = $query->affected_rows;
if ($result != 0) {
    echo json_encode([
        "status" => "Successful",
        "message" => "$result invitation sent"
    ]);
} else {
    echo json_encode([
        "status" => "Failed",
        "message" => "error sending invitations"
    ]);
}
