<?php

namespace App\Http\Controllers;

use App\Producto;
use App\Bien;
use App\Factura;
use Illuminate\Http\Request;
use Illuminate\Contracts\Routing\ResponseFactory;
use \Spatie\ArrayToXml\ArrayToXml;
use DB;
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
          $neArr = ["data" => $arr["data"] ];
          $result = ArrayToXml::convert($neArr);
          DB::select( "call import_xml ("    ."'". $result ."'" . ","  ."'".  $arr["head"][0] ."'" . "," . "'" . $arr["head"][1] ."'" . "," ."'" 
          . $arr["head"][2] ."'" . "," ."'" . $arr["head"][3] ."'". "," ."'" . $arr["head"][4] . "'". "," ."'". $arr["head"][5]."'"
          . "," ."'" . $arr["head"][6] ."'". "," ."'" . $arr["head"][7]."'" ."," ."'" . $arr["head"][8] ."'". "," ."'" . $arr["head"][9] ."'"
          . "," ."'" . $arr["head"][10] ."'" . "," ."'". $arr["head"][11] ."'" . "," . "'" . $arr["head"][12] ."'" . ")"  );
  
          return "se agrego el archivo exitosamente";
   }
    
}
