<?php
     ini_set('display_errors', 'on');     
     date_default_timezone_set("Asia/Jerusalem");
     header("Content-Type: text/html; charset=utf-8");
     $mysqli = new mysqli("127.0.0.1", 'QuizGameProject', '@%)je/}G@lx1s!UB');
     $mysqli->set_charset('utf8');
     if($mysqli == false)
        die("ERROR: Could not connect. " . mysqli_connect_error());
    // Attempt to select database
    $db_selected = $mysqli->select_db('quiz_game'); 
    if(!$db_selected)
    {
        // Attempt create database query execution (database is not created)
        $sql = "CREATE DATABASE quiz_game";
        if(!$mysqli->query($sql))
            die("ERROR: Could not able to execute $sql. " . $mysqli->error);
    }
    // Attempt to select table
    $select_table_query = "SELECT * FROM `leaderborad`";
    if(!$mysqli->query($select_table_query))
    {
        // Table is not created 
        $create_table_query = "CREATE TABLE leaderborad ( `Id` INT NOT NULL AUTO_INCREMENT , `Name` TEXT COLLATE utf8_general_ci NOT NULL , `Score` INT NOT NULL , PRIMARY KEY (`Id`))";
        if (!$mysqli->query($create_table_query))
            die("ERROR: Could not able to execute" . $mysqli->error);
    }
?>
