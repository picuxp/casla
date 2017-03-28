<?php
$subject = "Contact Request Form soccerClub";
$name = $_REQUEST['name'];
$phone = $_REQUEST['phone'];
$subject = $_REQUEST['subject'];
$email = $_REQUEST['email'];
$comment = $_REQUEST['comment'];


// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

$email_to_send_to = 'sagarsneh@gmail.com';

$txt = 'Name:'.$name.'<br/>'.
	 'phone No:'.$phone.'<br/>'.
	 'subject:'.$subject.'<br/>'.
	 'email:'.$email.'<br/>'.
	 'Message:'.$comment.'<br/>';


$status = mail($email_to_send_to,$subject,$txt,$headers);
echo $status?"<p>Message has been sent</p>":"<p>Message could not be sent.</p>";
