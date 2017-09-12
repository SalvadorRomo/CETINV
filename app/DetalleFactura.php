<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetalleFactura extends Model
{
    public function factura(){
    	return $this->belongsTo(Fctura::class);
    }

    public function producto(){
    	return $this->belongsTo(Producto::class);
    }
}
