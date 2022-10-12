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
	$to = "shamanproto@gmail.com";
	$from = "contact@domainedesfournelles.com";
  $replyto = $_POST['email'];
	
	$msg = '
	<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">

    :root {
      --main-text: #283556;
      --secondary-text: #fefefe;
    }

    html, body {
      margin: 0;
      padding: 0;
      font-size: 20px;
      font-family: Helvetica, sans-serif;
      font-weight: lighter;
    }
    .wrapper {
      width: 100vw;
      height: 100vh;
      padding-left: 40px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
    .logo {
      position: absolute;
      top: 0;
      left: 30px;
      width: 180px;
      height: 180px;
      background-image: url(http://www.domainedesfournelles.com/api/_imgs/PageLogo-B.png);
      background-repeat: no-repeat;
      background-size: contain;
    }
    .container {
      width: 100%;
      padding-top: 200px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      color: var(--main-text);}
    h1 { font-size: 1.3rem; line-height: 2.4rem;}

    em { font-style: normal; font-weight: bold; background-color: var(--main-text); color: var(--secondary-text); padding: 8px 16px; border-radius:5px; white-space: nowrap; }

    .email-link { color: var(--main-text); text-decoration: none; }

    p { margin-bottom: 20px; font-weight: bold; }

    ul { margin: 0; list-style: none; }

    li { margin-bottom: 10px; }

    .tags { background-color: unset; color: #283556; mix-blend-mode: unset; font-size: 1rem; }
    
    .text-container { z-index: 0position: relativedisplay: flexjustify-content: centeralign-items: centermargin-top: -50pxwidth: 100%; }
    
    .message { z-index: 5; width: 94%; margin-bottom: 100px; padding-right: 65px; box-sizing: border-box; padding-top: 130px; text-align: justify; }
    
    .quotes { z-index: 0; position: absolute; font-family:"Times New Roman", serif; font-size: 20rem; color: rgba(40, 53, 86, 0.05); }
    

      .q-open { top: 0; left: 0; }
      .q-close { bottom: 0; right: 70px; line-height: 0; }

    </style>
  </head>
  <body style="margin: 0; padding: 0; font-size: 20px; font-family: Helvetica, sans-serif; font-weight: lighter;">

  <div class="wrapper">

    <div class="logo"></div>

    <div class="container">

      <h1>Hello, tu as reçu un nouveau message : '.$_POST['fname'].'</h1>

      <p style="margin-bottom: 20px; font-weight: bold;"> 
        Voici ses coordonées:
        <ul style="margin: 0; list-style: none;">
          <li style="margin-bottom: 10px;"><em style="font-style: normal; font-weight: bold; background-color: #283556; color: #fefefe; padding: 8px 16px; border-radius:5px; white-space: nowrap;">Tel :</em>'.$_POST['tel'].'</li>
          <li style="margin-bottom: 10px;"><em style="font-style: normal; font-weight: bold; background-color: #283556; color: #fefefe; padding: 8px 16px; border-radius:5px; white-space: nowrap;">Email :</em> <a href="mailto:'.$_POST['email'].'" style="color: #283556; text-decoration: none;">me@leshorts.com</a></li>
        </ul>
      </p>

      <p style="margin-bottom: 20px; font-weight: bold;"> Et voici son message:</p>

      <div style="z-index: 0position: relativedisplay: flexjustify-content: centeralign-items: centermargin-top: -50pxwidth: 100%;">
        <div style="z-index: 0; position: absolute; font-family:\'Times New Roman\', serif; font-size: 20rem; color: rgba(40, 53, 86, 0.05); top: 0; left: 0;">&#x201C</div>
        <div style="z-index: 5; width: 94%; margin-bottom: 100px; padding-right: 65px; box-sizing: border-box; padding-top: 130px; text-align: justify;">
        '.nl2br($_POST['message']).'
        </div>
        <div style="z-index: 0; position: absolute; font-family:\'Times New Roman\', serif; font-size: 20rem; color: rgba(40, 53, 86, 0.05); bottom: 0; right: 70px; line-height: 0;">&#x201D</div>
      </div>

    </div>

  </div>
    
  </body>
  </html>
	';

array_push($errors, 'Step 3 : passed email creation');

	// Headers

	$headers = "MIME-Version: 1.0\r\n";
	$headers.= "Content-type: text/html; charset=UTF-8\r\n";
	$headers.= "From: " . $from . "\r\n";
  $headers.= "Reply-To: " . $replyto . "\r\n";

array_push($errors, 'Step 4 : passed header declaration');
	
$sendmail = mail($to, $subject, $msg, $headers);
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