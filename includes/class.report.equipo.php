<?php
/**
 * crear querus para extraer los datos de equipos_electromedicos
 */
class Equipo
{
private $pdo;
  function __construct($conexion)
  {
    $this->pdo=$conexion;
  }
  public function getStatus(){
    $sql="SELECT status_equipo.descripcion, inventario.hospital, categoria_equipo.descripcion,tipo_equipo.descripcion FROM `equipo` RIGHT JOIN status_equipo ON status_equipo.id RIGHT JOIN inventario ON inventario.id_equipo=equipo.id RIGHT JOIN categoria_equipo ON categoria_equipo.id= inventario.id_categoria RIGHT JOIN tipo_equipo ON inventario.id_tipo_equipo=tipo_equipo.id";
      $sentencia = $this->pdo->prepare($sql);
      $sentencia->execute();
      $resultado = $sentencia->fetchAll(PDO::FETCH_NUM);
      return $resultado;
  }
}



 ?>
