<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Details_item extends Model
{
    public function bien()
    {    
         return $this->hasOne(Bien::class);
    }
}
