<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

//? Declare the errors array
$errors = array(); 

if (empty($_POST['fname']) && empty($_POST['email'])) die();

array_push($errors, "Step 1: The post criterias failed");

if ($_POST)
	{
    array_push($errors, "Step 2: Entered the mail section");

	// set response code - 200 OK

	http_response_code(200);
	$subject = "Domaine des Fournelles, nouveau message de " . $_POST['fname'];
	$to = "domainedesfournelles@outlook.fr";
	$from = "contact@domainedesfournelles.com";
  $replyto = $_POST['email'];
	
	$msg = "
          <img src='http://domainedesfournelles.com/api/_imgs/PageLogo-B.png' width='120' height='120' />
          Hello, tu à reçu un nouveau message de : <b>".$_POST['fname']." ".$_POST['lname']." </b>
          <br />
          <b>Voici ses coordonnées:</b> 
          Tel ".$_POST["tel"]."
          Email ".$_POST["email"]."
          <br />
          <b>Voici son message:</b>
          ".$_POST["message"]."
          <br />
          <br />";

array_push($errors, 'Step 3 : passed email creation');

	// Headers

	$headers = "MIME-Version: 1.0\r\n";
	$headers.= "Content-type: text/html; charset=UTF-8\r\n";
	$headers.= "From: " . $from . "\r\n";
  $headers.= "Reply-To: " . $replyto . "\r\n";

array_push($errors, 'Step 4 : passed header declaration');
	
$sendmail = mail($to, $subject, nl2br($msg), $headers);
// $sendmail = true;

if ($sendmail){
  // echo json_encode( $_POST );
  echo json_encode([
    "sent" => true, 
    "message" => $errors,
  ]);
}
else
{
  // tell the user about error
  echo json_encode([
    "sent" => false, 
    "message" => $errors,
  ]);
}

}

	
?>