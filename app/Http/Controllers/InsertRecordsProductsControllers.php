<?php

namespace App\Http\Controllers;

use App\Producto;
use App\Bien;
use App\Factura;
use Illuminate\Http\Request;
use Illuminate\Contracts\Routing\ResponseFactory;
use \Spatie\ArrayToXml\ArrayToXml;
class InsertRecordsProductsControllers extends Controller
{

 public function insertProduct (Request $request)
  {
   		$product = new Producto; 

   		$product->nombre = $request->input('products.name');
   		$product->marca = $request->input('products.brand'); 
   		$product->modelo = $request->input('products.model');
   		$product->descripcion = $request->input('products.description'); 
   		$product->precio = $request->input('products.price');   
        if($product->save())
        {
            $invoice = new Factura();
            $invoice->fecha = $request->input('invoice.date');
            $invoice->nombre_provedor = $request->input('invoice.name');
            $invoice->telefono_provedor= $request->input('invoice.telSupp');
            $invoice->correo_provedor =  $request->input('invoice.emailSupp');            
           
            if($invoice -> save())
            {
                $good = new Bien; 
                $good->numero_serie = $request->input('goods.serie');
                $good->fecha_alta =  $request->input('goods.date'); 
                $good->estado =  $request->input('goods.state'); 
                $good->cuenta =  $request->input('goods.account'); 
                $good->subcuenta =  $request->input('goods.subaccount');
                $good->ultimo_ticket = 0;
                $prod = $product->find($product->id);                 
                $prod->bien()->save($good);
                $invo  = $invoice->find($invoice->id);
                $invo->bien()->save($good);
                return 'Data Saved';

            }     	
        }                                                                      
   }

   public function insertMultipleProduct(Request $request){
      
          $arr = $request->all();
          $result = ArrayToXml::convert($arr);
          var_dump($result);
        //$arrayDecoded = json_decode();
   }
    
}
