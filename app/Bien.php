<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bien extends Model
{
     public function factura(){

     	return $this->belongsTo(Factura::class);
     }

     public function producto(){

     	return $this->belongsTo(Producto::class);
     }

     public function detalle()
     {    
          return $this->hasMany(Details_item::class);
     }
}
