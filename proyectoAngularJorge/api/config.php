<?php
// Permitir peticiones desde Angular (CORS)
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Manejo de la petición preflight de CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$db = [
    'host' => 'db',
    'port' => '3306',
    'username' => 'root',
    'password' => 'futbolista', // Si pusiste contraseña al entrar a phpMyAdmin, escríbela aquí
    'db' => 'proyecto_angular'
];
?>
