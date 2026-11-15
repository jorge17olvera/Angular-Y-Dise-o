<?php
include "config.php";
include "utils.php";

$dbConn = connect($db);

// 1. Endpoint para OBTENER el historial de fichajes de un usuario
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['usuario_id'])) {
        $usuario_id = $_GET['usuario_id'];
        
        // Buscamos los fichajes ordenados del más reciente al más antiguo
        $statement = $dbConn->prepare("SELECT * FROM fichajes WHERE usuario_id = :usuario_id ORDER BY fecha_hora DESC");
        $statement->bindValue(':usuario_id', $usuario_id);
        $statement->execute();
        
        $fichajes = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        header("HTTP/1.1 200 OK");
        echo json_encode(["exito" => true, "fichajes" => $fichajes]);
        exit();
    }
}

// 2. Endpoint para REGISTRAR una nueva entrada o salida
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $input = json_decode($json, true);

    if (isset($input['usuario_id']) && isset($input['tipo'])) {
        $usuario_id = $input['usuario_id'];
        $tipo = $input['tipo']; // 'entrada' o 'salida'

        try {
            // MySQL guardará la fecha y hora automáticamente gracias a CURRENT_TIMESTAMP
            $statement = $dbConn->prepare("INSERT INTO fichajes (usuario_id, tipo) VALUES (:usuario_id, :tipo)");
            $statement->bindValue(':usuario_id', $usuario_id);
            $statement->bindValue(':tipo', $tipo);
            $statement->execute();
            
            header("HTTP/1.1 200 OK");
            echo json_encode(["exito" => true, "mensaje" => "Fichaje registrado"]);
        } catch (PDOException $e) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(["exito" => false, "mensaje" => "Error al registrar el fichaje"]);
        }
        exit();
    }
}

header("HTTP/1.1 400 Bad Request");
?>