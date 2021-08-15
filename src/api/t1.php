<html>
<body>

<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$rest_json = file_get_contents("php://input");

echo"<b>phpo says hello</b>";
$err="";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$a=$_POST["name"];

if($a=="")
{
$err="name required";

}}

?>


<form action="t1.php" method="post">
Name<input type="text" name="name"><?php echo $err ?>
<input type="submit" value="submit">
</form>
</body>
</html>
