<?php
function connect($db)
{
    try {
        $dsn = "mysql:host={$db['host']};port={$db['port']};dbname={$db['db']};charset=utf8mb4";
        $conn = new PDO($dsn, $db['username'], $db['password']);

        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $conn;
    } catch (PDOException $exception) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode([
            "exito" => false,
            "mensaje" => "Error de conexión a la base de datos: " . $exception->getMessage()
        ]);
        exit();
    }
}

function getParams($input)
{
    $filterParams = [];
    foreach ($input as $param => $value) {
        $filterParams[] = "$param=:$param";
    }
    return implode(", ", $filterParams);
}
?>