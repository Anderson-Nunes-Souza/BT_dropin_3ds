<?php 
require('./authorization.php');
include("./vendor/autoload.php");
//limpa o print do Token.php para não exibir na Thankyoupage
ob_clean(); 

$nonceFromTheClient = $_POST["payment_method_nonce"];
//$deviceDataFromTheClient = $_POST["data_collector"];

//Use payment method nonce here
$result = $gateway->transaction()->sale([
    'amount' => '25.00',
    'paymentMethodNonce' => $nonceFromTheClient,
    //'deviceData' => $deviceDataFromTheClient,
    'options' => [
      'submitForSettlement' => True
    ]
  ]);
  
  //echo($result->success); //true
  //echo($result->transaction); //Exibe todos os dados da transação
  //$result->transaction->id; //Retorna o ID da transação
  $_SESSION["transactionID"]= $result->transaction->id;

  require('./Thankyou.php');
?>