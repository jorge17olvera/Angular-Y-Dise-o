<?php
include "config.php";
include "utils.php";

$dbConn = connect($db);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $input = json_decode($json, true);

    if (isset($input['accion']) && $input['accion'] == 'login') {
        $email = trim($input['email'] ?? '');
        $password = $input['password'] ?? '';

        $statement = $dbConn->prepare("SELECT id, nombre, email, rol FROM usuarios WHERE email = :email AND password = :password");
        $statement->bindValue(':email', $email);
        $statement->bindValue(':password', $password);
        $statement->execute();

        $usuario = $statement->fetch(PDO::FETCH_ASSOC);

        header("HTTP/1.1 200 OK");
        if ($usuario) {
            echo json_encode(["exito" => true, "usuario" => $usuario]);
        } else {
            echo json_encode(["exito" => false, "mensaje" => "Correo o contraseña incorrectos"]);
        }
        exit();
    }

    if (isset($input['accion']) && $input['accion'] == 'registro') {
        $nombre = trim($input['nombre'] ?? '');
        $email = trim($input['email'] ?? '');
        $password = $input['password'] ?? '';
        $rol = $input['rol'] ?? 'empleado';

        if (empty($nombre) || empty($email) || empty($password)) {
            header("HTTP/1.1 200 OK");
            echo json_encode(["exito" => false, "mensaje" => "Todos los campos son obligatorios"]);
            exit();
        }

        try {
            $check = $dbConn->prepare("SELECT id FROM usuarios WHERE email = :email");
            $check->bindValue(':email', $email);
            $check->execute();

            if ($check->fetch()) {
                header("HTTP/1.1 200 OK");
                echo json_encode(["exito" => false, "mensaje" => "Ese correo ya está registrado"]);
                exit();
            }

            $statement = $dbConn->prepare("INSERT INTO usuarios (nombre, email, password, rol) VALUES (:nombre, :email, :password, :rol)");
            $statement->bindValue(':nombre', $nombre);
            $statement->bindValue(':email', $email);
            $statement->bindValue(':password', $password);
            $statement->bindValue(':rol', $rol);
            $statement->execute();

            $id = $dbConn->lastInsertId();

            header("HTTP/1.1 200 OK");
            echo json_encode([
                "exito" => true,
                "mensaje" => "Usuario registrado correctamente",
                "usuario" => [
                    "id" => $id,
                    "nombre" => $nombre,
                    "email" => $email,
                    "rol" => $rol
                ]
            ]);
        } catch (PDOException $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(["exito" => false, "mensaje" => "Error en la base de datos: " . $e->getMessage()]);
        }
        exit();
    }
}
?>