
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


$servername = "localhost";
$username = "root";
$password = "";
$dbname="react_user";
// Create connection
$conn = mysqli_connect($servername, $username, $password,$dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}


 $sql = "SELECT user_name FROM user_react WHERE user_email='$email' AND user_password='$pass' ";
$res = mysqli_query($conn, $sql);

if (mysqli_num_rows($res) > 0) {
  // output data of each row
  while($row = mysqli_fetch_assoc($res)) {
    echo json_encode(["user_name" => $row['user_name'], "mess"=>"Successfully Logged In"]);
  }
}
 

else{
   
     echo json_encode(["user_name" => "","mess"=>"Invalid Email or Password" ]);
  }

?>
