<?php
require_once "../../includes/Conexion.php";
require_once '../../includes/class.report.equipo.php';
$pdo=new Conexion();
$equipo=new Equipo($pdo);
$categoria=$equipo->getStatus();
$Name = array();
foreach ($categoria as $key) {
//   echo "<br>";
// echo $key[0]." ".$key[1]." ".$key[2].' '.$key[3];
  $Name[]=array('status' =>$key[0],
                'hosp'=> $key[1],
                'descrip'=> $key[2],
                'type'=> $key[2]);
}

printf(json_encode($Name));



// $var=json_encode($categoria);
// printf($var);
// echo "<script>console.log($var)</script>";








// $equipo=json_encode($categoria);
// $products = json_decode($equipo, true);
//
//
// foreach ($products as $key ) {
//   echo "<br>";
//   echo "<br>";
//   print_r( $key);
//   # code...


 ?>
