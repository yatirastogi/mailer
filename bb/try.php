
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$email=$_POST['email'];
$pass=$_POST['password'];
$li=$_POST['list'];
$json = json_encode($li); 

$json = json_decode($json); 
$i=0;
for($i=0;$i<=2;$i++)
{
echo  $json[$i] ;
}
?>










?>
