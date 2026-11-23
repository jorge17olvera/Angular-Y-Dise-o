<?php
include "config.php";
include "utils.php";

$dbConn = connect($db);
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    // Listar empleados para el select del formulario admin
    if (isset($_GET['usuarios'])) {
        $stmt = $dbConn->prepare("SELECT id, nombre, email FROM usuarios ORDER BY nombre ASC");
        $stmt->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        exit();
    }

    if (isset($_GET['usuario_id'])) {
        $stmt = $dbConn->prepare("SELECT * FROM fichajes WHERE usuario_id = :usuario_id ORDER BY fecha_hora DESC");
        $stmt->bindValue(':usuario_id', $_GET['usuario_id'], PDO::PARAM_INT);
        $stmt->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        exit();
    }

    $sql = "SELECT f.id, f.usuario_id, u.nombre AS empleado, u.email, f.tipo, f.fecha_hora
            FROM fichajes f
            INNER JOIN usuarios u ON f.usuario_id = u.id
            ORDER BY f.fecha_hora DESC";
    $stmt = $dbConn->prepare($sql);
    $stmt->execute();
    header("HTTP/1.1 200 OK");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit();
}

if ($method == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $usuario_id = $input['usuario_id'] ?? null;
    $tipo = $input['tipo'] ?? '';
    // Si el admin envía fecha_hora la formateamos; si es un empleado fichando ahora, usa la actual
    $fecha_hora = !empty($input['fecha_hora'])
        ? str_replace('T', ' ', $input['fecha_hora'])
        : date('Y-m-d H:i:s');

    if (!$usuario_id || empty($tipo)) {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(["exito" => false, "mensaje" => "Faltan datos obligatorios"]);
        exit();
    }

    $stmt = $dbConn->prepare("INSERT INTO fichajes (usuario_id, tipo, fecha_hora) VALUES (:usuario_id, :tipo, :fecha_hora)");
    $stmt->bindValue(':usuario_id', $usuario_id, PDO::PARAM_INT);
    $stmt->bindValue(':tipo', $tipo);
    $stmt->bindValue(':fecha_hora', $fecha_hora);
    $stmt->execute();

    header("HTTP/1.1 200 OK");
    echo json_encode(["exito" => true, "id" => $dbConn->lastInsertId()]);
    exit();
}

if ($method == 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;
    $usuario_id = $input['usuario_id'] ?? null;
    $tipo = $input['tipo'] ?? '';
    $fecha_hora = !empty($input['fecha_hora']) ? str_replace('T', ' ', $input['fecha_hora']) : '';

    if (!$id || !$usuario_id || empty($tipo) || empty($fecha_hora)) {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(["exito" => false, "mensaje" => "Todos los campos son obligatorios para editar"]);
        exit();
    }

    $stmt = $dbConn->prepare("UPDATE fichajes SET usuario_id = :usuario_id, tipo = :tipo, fecha_hora = :fecha_hora WHERE id = :id");
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->bindValue(':usuario_id', $usuario_id, PDO::PARAM_INT);
    $stmt->bindValue(':tipo', $tipo);
    $stmt->bindValue(':fecha_hora', $fecha_hora);
    $stmt->execute();

    header("HTTP/1.1 200 OK");
    echo json_encode(["exito" => true]);
    exit();
}

if ($method == 'DELETE') {
    $id = $_GET['id'] ?? null;

    if (!$id) {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(["exito" => false, "mensaje" => "Falta el ID del fichaje"]);
        exit();
    }

    $stmt = $dbConn->prepare("DELETE FROM fichajes WHERE id = :id");
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    header("HTTP/1.1 200 OK");
    echo json_encode(["exito" => true]);
    exit();
}
?>