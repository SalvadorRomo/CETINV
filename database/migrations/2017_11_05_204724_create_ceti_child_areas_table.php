<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCetiChildAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ceti_child_areas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_area')->unsigned(); 
            $table->foreign('id_area')->references('id')->on('ceti_areas');                         
            $table->string('name');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ceti_child_areas');
    }
}
