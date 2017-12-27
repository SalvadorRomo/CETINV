<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCetiAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ceti_areas', function (Blueprint $table) {
            $table->increments('id',true);
            $table->string('name_area'); 
            $table->integer('user_id')->unsigned()->unique();             
            $table->foreign('user_id')->references('id')->on('users');                         
            $table->timestamps();
        });

        Schema::table('users', function(Blueprint $table){

            $table->foreign('idarea')->references('id')->on('ceti_areas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ceti_areas');
    }
}
