<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetailsItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('details_item', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_user')->unsigned(); 
            $table->foreign('id_user')->references('id')->on('users');
            $table->integer('id_item')->unsigned();
            $table->foreign('id_item')->references('id')->on('biens');            
            $table->integer('id_area');
            $table->integer('id_subarea');            
            $table->integer('id_ticket')->unsigned();
            $table->foreign('id_ticket')->references('id')->on('tickets');                        
            $table->boolean('is_manager');         
            $table->boolean('is_user');                     
            $table->timestamps();
        });

        Schema::table('biens', function (Blueprint $table){
            $table->foreign('id_details_bien')->references('id')->on('details_item');                        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('details_item');
    }
}
