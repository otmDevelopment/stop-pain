<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$clinic = $_POST['clinic'];
$name = $_POST['name'];
$surname = $_POST['surname'];
$phone = $_POST['phone'];

// Формирование самого письма
$title = "стопболь.рф";
$body = "
<h2>Запись на прием</h2>
<b>Адрес клиники:</b> $clinic<br>
<b>Имя:</b> $name<br>
<b>Фамилия:</b> $surname<br>
<b>Телефон:</b>$phone
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

   // Настройки вашей почты
   $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
   $mail->Username   = 'sslonovboriss@yandex.ru'; // Логин на почте
   $mail->Password   = 'etdvnalshcttdmye'; // Пароль на почте
   $mail->SMTPSecure = 'ssl';
   $mail->Port       = 465;
   $mail->setFrom('sslonovboriss@yandex.ru', 'Заявка с сайта стопболь.рф'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('stop-bol.ru@yandex.ru'); 

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);