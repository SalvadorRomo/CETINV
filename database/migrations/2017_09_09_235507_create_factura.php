<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFactura extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('facturas', function (Blueprint $table) {
            //$table->increments('id_');
            $table->timestamps();
            $table->integer('numero_factura');
            $table->primary('numero_factura');
            //$table->primary(['id_','numero_factura']);
            $table->string('fecha');
            $table->string('nombre_provedor');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('factura');
    }
}
