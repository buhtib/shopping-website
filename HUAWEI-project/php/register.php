<?php
// 获取post格式数据（不是form表单的）
  $json = json_decode(file_get_contents("php://input"));
  $username = $json -> name;
  $password = $json -> pass;
  $link = new mysqli('localhost','root', '' ,'mydb','3306');
//   查询这个用户名
  $sql = "SELECT username from xinxi where username='$username'";
  $sql2 = "insert into xinxi (username,password) values('$username','$password')";
  $result = $link ->query($sql);
  $row = $result ->fetch_object();
//   查询用户名是否查到
  if($row){
    // 查到了，返回100
    $arr = array("msg"=>"100");
  }else{
      // 没查到，返回200，并添加用户名和密码到数据库
    $link ->query($sql2);
    $arr = array("msg"=>"200");
  }
  echo json_encode($arr);

?>