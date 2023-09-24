<?php
if (isset($_POST['submit'])) {
    $to = "azzar.mr.zs@gmail.com"; // Your email address
    $subject = $_POST["subject"];
    $message = "Name: " . $_POST["name"] . "\n";
    $message .= "Email: " . $_POST["email"] . "\n";
    $message .= "Message: " . $_POST["message"];

    $headers = "From: " . $_POST["email"];

    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
