<?php
include "config.php";
include "utils.php";

$dbConn = connect($db);

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $statement = $dbConn->prepare("SELECT * FROM prendas");
    $statement->execute();

    $prendas = $statement->fetchAll(PDO::FETCH_ASSOC);

    header("HTTP/1.1 200 OK");
    echo json_encode(["exito" => true, "prendas" => $prendas]);
    exit();
}

header("HTTP/1.1 400 Bad Request");
?>
