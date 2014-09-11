<?php

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["fullName"]));
		$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $phone = trim($_POST["phone"]);
        $topic = trim($_POST["topic"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($phone) OR empty($topic) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            header("HTTP/1.0 400 Bad Request");
            echo "Пожалуйста, заполните форму полностью и повторите отправку.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "contact@t8publishing.ru";

        // Set the email subject.
        $subject = "Новое сообщение от $name";

        // Build the email content.
        $email_content = "Имя: $name\n";
        $email_content .= "Эл. почта: $email\n\n";
        $email_content .= "Телефон: $phone\n\n";
        $email_content .= "Тема: $topic\n\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            header("HTTP/1.0 200 OK");
            echo "Спасибо! Ваше сообщение было отправлено.";
        } else {
            // Set a 500 (internal server error) response code.
            header("HTTP/1.0 500 Internal Server Error");
            echo "Что-то пошло не так! Ваше сообщение не может быть доставлено.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        header("HTTP/1.0 403 Forbidden");
        echo "Во время отправки произошла ошибка, попробуйте позднее.";
    }

?>