<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('owner_id');
            $table->integer('item_id');
            $table->integer('area_id');
            $table->integer('sub_area_id'); 
            $table->integer('transfer_user_id');
            $table->integer('transfer_manager_user_id');
            $table->integer('manager_manager_transfer_user_id');
            $table->integer('manager_owner_id');
            $table->integer('manager_manager_owner_id');

            $table->boolean('manager_owner_approval');
            $table->boolean('manager_transfer_approval');
            $table->boolean('manager_manager');
            $table->boolean('is_manager_transfer');            
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
        Schema::dropIfExists('tickets');
    }
}
