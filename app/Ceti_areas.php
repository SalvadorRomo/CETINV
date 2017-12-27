<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ceti_areas extends Model
{
    public function cetiareas()
    {
        return $this->hasMany('App\Ceti_child_areas');
    }
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function users()
    {
        return $this->belongsTo('App\User');
    }
}
