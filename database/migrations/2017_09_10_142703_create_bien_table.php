<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBienTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('biens', function (Blueprint $table) {
           
            $table->increments('id');
            $table->timestamps();
            $table->string('numero_serie');
            $table->dateTime('fecha_alta');
            $table->string('estado');
            $table->string('cuenta');
            $table->string('subcuenta');
            $table->integer('factura_numero');
            $table->foreign('factura_numero')->references('numero_factura')->on('facturas');
            $table->integer('producto_id')->unsigned()->nullable();
            $table->foreign('producto_id')->references('id')->on('productos');            
            $table->integer('ultimo_ticket');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bien');
    }
}
