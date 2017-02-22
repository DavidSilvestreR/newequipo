<?php
/**
 * conexion
 */
class Conexion extends PDO
{
  private $localhots='localhost';
  private $user='root';
  private $pasword='';
  private $db='equipo_electromedico';
  private $pdo;
  function __construct()
  {
    try {
      parent::__construct("mysql:host={$this->localhots};dbname={$this->db}","{$this->user}","{$this->pasword}");
    } catch (Exception $e) {
      echo 'Error!: ' . $e->getMessage() . PHP_EOL;
    }finally{
      $pdo=null;
    }
  }
}



 ?>
