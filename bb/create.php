
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


$name=$_POST['name_c'];
$email=$_POST['email_c'];
$pass=$_POST['password_c'];


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


 $sql = "SELECT * FROM user_react WHERE user_email='$email' ";
$res = mysqli_query($conn, $sql);

if (mysqli_num_rows($res) > 0) {
echo json_encode(["sent" => False, "create_mess"=>"email already registered"]);
}
else
{
$sql_1 = "INSERT INTO user_react (user_name, user_email, user_password)
VALUES ('$name', '$email', '$pass')";

if ($conn->query($sql_1) === TRUE) {
echo json_encode(["sent" => TRUE, "create_mess"=>"Account Succesfully Created"]);
} 
else {
 echo json_encode(["sent" => False, "create_mess"=>"Something Went Wrong"]); 
}
}

?>

