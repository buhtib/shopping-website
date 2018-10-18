<?php
  // 仅限于form表单形式， json形式无法获取 
    $username = $_GET["name"];
    $pass = $_GET["pass"];
   
    $link =new mysqli('localhost','root','','mydb','3306');
    $link -> query("SET CHARACTER SET 'utf8'");//读库 
    $link -> query("set names 'utf8'"); //写库
    // 查询用户名的那一行
    $sql = "SELECT * from xinxi where username='$username'";
    $result = $link->query($sql);
    $row = $result ->fetch_object();
    if($row){
        if(($row->password)==$pass){
            // 密码用户名都正确
            $arr = array("msg"=>200);
        }else{
            // 用户存在但密码错误
            $arr = array("msg"=>100);
        }
    }else{
        $arr = array("msg"=>1000);
    }
    echo json_encode($arr);

?>