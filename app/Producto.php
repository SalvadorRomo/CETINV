<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Producto extends Model
{
   	public function bien()
    {
        return $this->hasMany(Bien::class);
    }

    public function detallefactura(){
    	
    	return $this->hasMany(DettalleFactura::class);
    }
}
