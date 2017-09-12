<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
   	public function detallefactura(){

   		return $this->hasMany(DetalleFactura::class);
   	}

   	public function bien(){
   		return $this->hasMany(Bien::class);
   	}
}
