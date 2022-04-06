<?php
    include_once 'Config.php';
    header("Access-Control-Allow-Origin: *");
    if(isset($_GET))
    {
        $select_leaderborad = "SELECT * FROM `leaderborad` ORDER BY `Score` DESC LIMIT 10";
        $query = $mysqli->query($select_leaderborad);
        if($query && $query->num_rows >= 0)
        {
            echo json_encode($query->fetch_all());
        }
        else
        {
            echo json_encode(['error' => 'Error while getting data']);
        }
    }  
?>