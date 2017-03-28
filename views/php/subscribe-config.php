<?php 
	// Mail Chimp Api key
	$mailchimApikey = '25ed1cc5dd33d582daceb4cb6302629a-us11';
	// Mail Chimp List ID
	$mailchimplistID = '5a155aaf21';	
	// After form submit success message
	$response_success = 'successfully subscribed';

	require 'MailChimp.php';
	use \DrewM\MailChimp\MailChimp;
	$email = $_REQUEST['email'];
	$MailChimp = new MailChimp($mailchimApikey);
	$result = $MailChimp->post('lists/'.$mailchimplistID.'/members', array(
	                'email_address'     => $email,
	                'status'            => 'subscribed',
	            ));
 ?>
 <?php if($result['status']=='subscribed'){
 	echo 	$response_success;
 	}
 else {
 			echo 	'Something wrong.';
 	} 

 	?>
