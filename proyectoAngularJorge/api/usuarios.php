<?php
include "config.php";
include "utils.php";

$dbConn = connect($db);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $input = json_decode($json, true);

    // Endpoint para Login
    if (isset($input['accion']) && $input['accion'] == 'login') {
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $statement = $dbConn->prepare("SELECT id, nombre, email, rol FROM usuarios WHERE email = :email AND password = :password");
        $statement->bindValue(':email', $email);
        $statement->bindValue(':password', $password);
        $statement->execute();
        
        $usuario = $statement->fetch(PDO::FETCH_ASSOC);

        if ($usuario) {
            header("HTTP/1.1 200 OK");
            echo json_encode(["exito" => true, "usuario" => $usuario]);
        } else {
            header("HTTP/1.1 401 Unauthorized");
            echo json_encode(["exito" => false, "mensaje" => "Usuario o contraseña incorrectos"]);
        }
        exit();
    }

    // Endpoint para Registro
    if (isset($input['accion']) && $input['accion'] == 'registro') {
        $nombre = $input['nombre'] ?? '';
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        $rol = 'empleado'; // Todos los que se registran son empleados por defecto

        try {
            $statement = $dbConn->prepare("INSERT INTO usuarios (nombre, email, password, rol) VALUES (:nombre, :email, :password, :rol)");
            $statement->bindValue(':nombre', $nombre);
            $statement->bindValue(':email', $email);
            $statement->bindValue(':password', $password);
            $statement->bindValue(':rol', $rol);
            $statement->execute();

            header("HTTP/1.1 200 OK");
            echo json_encode(["exito" => true, "mensaje" => "Usuario registrado correctamente"]);
        } catch (PDOException $e) {
            header("HTTP/1.1 400 Bad Request");
            // Si da el error 23000 es porque el email ya existe en la base de datos
            if ($e->getCode() == '23000') {
                echo json_encode(["exito" => false, "mensaje" => "El correo ya está registrado"]);
            } else {
                echo json_encode(["exito" => false, "mensaje" => "Error al registrar el usuario"]);
            }
        }
        exit();
    }
}

header("HTTP/1.1 400 Bad Request");
?>