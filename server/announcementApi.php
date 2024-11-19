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

$announcement = $_POST["announcement"];
$id = $payload->userId;

$query = $connection->prepare("INSERT INTO announcements(announcement,instructor_id) VALUES(?,?)");
$query->bind_param("si", $announcement, $id);
$query->execute();

$result = $query->affected_rows;
if ($result != 0) {
    echo json_encode([
        "status" => "Successful",
        "message" => "$result annoucement posted"
    ]);
} else {
    echo json_encode([
        "status" => "Failed",
        "message" => "error posting announcement"
    ]);
}