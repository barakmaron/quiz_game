<?php
    include_once 'Config.php';
    header("Access-Control-Allow-Origin: *");
    if(isset($_POST))
    {
        $post = json_decode(file_get_contents('php://input'), true);
        $player_name = $post["player"];
        $player_score = $post["score"];        
        $insert_player_query = "INSERT INTO `leaderborad` (`Name`, `Score`) VALUES ('".$player_name."', ".$player_score.")";
        $query = $mysqli->query($insert_player_query);
        if($query)
        {
            echo json_encode(['true']);
        }
        else
        {
            echo json_encode(['error' => 'Error while setting data']);
        }
        exit;
    }
   
?>