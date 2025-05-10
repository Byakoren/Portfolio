<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Sécurité basique
    if (!empty($_POST['website'])) die("Bot détecté");

    $name    = strip_tags(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL);
    $message = strip_tags(trim($_POST["message"]));

    if (!$name || !$email || !$message) {
        die("Données invalides");
    }

    $mail = new PHPMailer(true);

    try {
        // Paramètres SMTP o2switch
        $mail->isSMTP();
        $mail->Host       = 'nom_host'; // Change si différent
        $mail->SMTPAuth   = true;
        $mail->Username   = 'TON_MAIL_ICI';
        $mail->Password   = 'TON_MDP_ICI';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // ou STARTTLS si port 587
        $mail->Port       = 465;

        // Expéditeur & destinataire
        $mail->setFrom('TON_MAIL_ICI', 'prénom nom');
        $mail->addAddress('Ton_Mail_ICI'); // tu reçois ici

        // Contenu
        $mail->isHTML(false);
        $mail->Subject = '📬 Nouveau message depuis ton portfolio';
        $mail->Body    = "Nom : $name\nEmail : $email\n\nMessage :\n$message";

        $mail->send();
        echo "<script>alert('Message envoyé avec succès 👍'); window.location.href='index.html#contact';</script>";
    } catch (Exception $e) {
        echo "<script>alert('Erreur lors de l\'envoi : {$mail->ErrorInfo}'); window.history.back();</script>";
    }

} else {
    die("Méthode non autorisée.");
}
