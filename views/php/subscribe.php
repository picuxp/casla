<?php 
	// Mail Chimp Api key
	$mailchimApikey = 'xxxxxxxxxxxxxxxxxxxxx';
	// Mail Chimp List ID
	$mailchimplistID = 'xxxxxx';	
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
