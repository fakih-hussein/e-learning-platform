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

$course = $_POST["course_id"];
$id = $payload->userId;

$query = $connection->prepare("INSERT INTO student_courses(course_id) VALUES(?)");
$query->bind_param("i", $course);
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
