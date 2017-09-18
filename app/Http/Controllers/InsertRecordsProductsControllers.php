<?php

namespace App\Http\Controllers;

use App\Producto;
use App\Bien;
use App\DetalleFactura;
use App\Factura;
use Illuminate\Http\Request;
use Illuminate\Contracts\Routing\ResponseFactory;
use \Spatie\ArrayToXml\ArrayToXml;
use DB;
class InsertRecordsProductsControllers extends Controller
{

 public function insertProduct (Request $request)
  {
      
        $arr = $request->all();
        DB::select( "call store_product("    ."'".  $arr["data"]["name"] ."'" . "," . "'" . $arr["data"]["brand"] ."'" . "," ."'" 
        . $arr["data"]["model"] ."'" . "," ."'" . $arr["data"]["description"] ."'". "," ."'" . $arr["data"]["price"] . "'". "," ."'". $arr["data"]["invnum"]."'"
        . "," ."'" . $arr["data"]["invnom"] ."'". "," ."'" . $arr["data"]["invdate"]."'" ."," ."'" . $arr["data"]["invdetquan"] ."'". "," ."'" . $arr["data"]["godser"] ."'"
        . "," ."'" . $arr["data"]["goodstate"] ."'" . "," ."'". $arr["data"]["goodcoun"] ."'" . "," . "'" . $arr["data"]["goodsub"] ."'" . ")"  );
        
        return "Registro Creado";   
  }

   public function insertMultipleProduct(Request $request)
   {
      
          $arr = $request->all();
          $neArr = ["data" => $arr["data"] ];
          $result = ArrayToXml::convert($neArr);
          DB::select( "call import_xml ("    ."'". $result ."'" . ","  ."'".  $arr["head"][0] ."'" . "," . "'" . $arr["head"][1] ."'" . "," ."'" 
          . $arr["head"][2] ."'" . "," ."'" . $arr["head"][3] ."'". "," ."'" . $arr["head"][4] . "'". "," ."'". $arr["head"][5]."'"
          . "," ."'" . $arr["head"][6] ."'". "," ."'" . $arr["head"][7]."'" ."," ."'" . $arr["head"][8] ."'". "," ."'" . $arr["head"][9] ."'"
          . "," ."'" . $arr["head"][10] ."'" . "," ."'". $arr["head"][11] ."'" . "," . "'" . $arr["head"][12] ."'" . ")"  );
  
          return "se agrego el archivo exitosamente";
}

    public function getProductCount(Request $request){
        /* Variable declaration */
        $keyValues = array();
        $keyValuesName = array();
        /* get quieries */
        $idGoodnes  = DB::table('biens')->select('producto_id','ultimo_ticket')->get();
        $prodName   = DB::table('productos')->select('id','nombre')->get();
        $cont = 0;
        
     // var_dump($idGoodnes);
       foreach($prodName as $prod){
                $id = $prod->id;
          // if($keyValues[$id] == null  ){
            $keyValues[$prod->id] = $prod->nombre;    
           // }
        }        
        foreach($idGoodnes as $val){
            $idProduc = $val->producto_id; 
            $tickPro  = $val->ultimo_ticket;           
            if(  $tickPro == 0 ){
                $name = $keyValues[$idProduc]; 
                if(! isset($keyValuesName[$name])){
                     $keyValuesName[$name] = 0;        
                }       
                    $keyValuesName[$name] += 1;              
            }                
        }   

         return response()->json(["ids" => $keyValues, "cont" => $keyValuesName]);
     }


    
}
