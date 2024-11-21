<?php
include "connection.php";
require "./../vendor/autoload.php";

use Firebase\JWT\JWT;

$data=json_decode(file_get_contents("php://input"),true);

$secretKey="SecretKey";
$username = $data["username"] ?? null;
$password = $data["password"] ?? null;

if($username == null || $password == null){
    echo json_encode([
        "message"=>"Credentials are required"
    ]);
    return;
}

$query=$connection->prepare("SELECT * FROM users WHERE username=?");
$query->bind_param("s",$username);
$query->execute();

$result=$query->get_result();

if($result->num_rows!=0){
    $user = $result->fetch_assoc();
    // $check=password_verify($password,$user["password"]);

    if($password === $user["password"]){
        $payload=[
            "userId"=>$user["id"],
            "userType"=>$user["user_type_id"]
        ];
        $token=JWT::encode($payload,$secretKey,"HS256");

        echo json_encode([
            "message"=>"Succesful",
            "user"=>$user,
            "access_token"=>$token,
        ]);
    }else{
        http_response_code(400);
        echo json_encode([
            "message"=>"invalid credentials",
        ]);
    }
}else{
    http_response_code(400);
    echo json_encode([
        "message"=>"invalid credentials"
    ]);
}