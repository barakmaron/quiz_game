# Description
This is a React based project of a quiz game with php backend server for managing mysql database.

# Depandcy
Php
mysql server

# Setup
1) Change Config.php at line 5:
<code>$mysqli = new mysqli("HOST_IP", 'USER_NAME', 'PASSWORD');</code>
set your mysql server connection values.
2) Change database name in Config.php at line 10:
<code>$db_selected = $mysqli->select_db('DATABASE_NAME');</code>
3) Change url for GetRequest and PostRequest in the React, src/components/ApiManager.js at lines 18 and 30:
Line 18: <code>const res = await fetch('https://URL_OF_YOU_SITE/GetRequest.php');</code>
Line 30: <code>const res = await fetch('https://URL_OF_YOU_SITE/PostRequest.php', requestOptions);</code>