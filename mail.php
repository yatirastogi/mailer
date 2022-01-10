<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
$email=$_POST['email'];
$pass=$_POST['password'];
$message=$_POST['messageToSend'];
require_once "vendor/autoload.php";///
$recep=$_POST['list'];//list of recepients
//PHPMailer Object
$mail = new PHPMailer(true); //Argument true in constructor enables exceptions

$mail->SMTPDebug = 2;                   // Enable verbose debug output
$mail->isSMTP();                        // Set mailer to use SMTP
$mail->Host       = "smtp.gmail.com";    // Specify main SMTP server
$mail->SMTPAuth   = true;               // Enable SMTP authentication
$mail->Username   = $email;     // SMTP username
$mail->Password   = $password;         // SMTP password
$mail->SMTPSecure = 'tls';            
$mail->Port       = 587;   
$mail->Body    = $message;

$arrlength = count($recep);
for($x = 0; $x < $arrlength; $x++) {
    $mail->addAddress($recep[$x]);
    $mail->send();
  }

  echo json_encode(["mail_sent" =>1 ]);
} catch (Exception $e) {
    echo json_encode(["mail_sent" =>0 ]);
}
?>