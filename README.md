# Description
https://shimmering-lokum-790fbb.netlify.app<br>
This is a React based project of a quiz game with php backend server for managing mysql database.

# Dependency
Php
mysql server

# Setup
1. Change Config.php at line 5:
```php 
$mysqli = new mysqli("HOST_IP", 'USER_NAME', 'PASSWORD');
```
> set your mysql server connection values.
2. Change database name in Config.php at line 10:
```php 
$db_selected = $mysqli->select_db('DATABASE_NAME');
```
3. Change url for GetRequest and PostRequest in the React, src/components/ApiManager.js at lines 18 and 30:

> Line 18: 
```javascript 
const res = await fetch('https://URL_OF_YOUR_SERVER/GetRequest.php');
```
> Line 30: 
```javascript 
const res = await fetch('https://URL_OF_YOUR_SERVER/PostRequest.php', requestOptions);
```
