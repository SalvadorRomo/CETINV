<?php

namespace App\Http\Controllers;

use App\Producto;
use App\Bien;
use App\DetalleFactura;
use App\Factura;
use App\Ceti_areas;
use App\Users;
use App\Details_item;
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
        
        $products = array();
         $products_name = array();
         $managers = array();
        
         $goodnes  = DB::table('biens')->where('asigando',0)->get();
        $prodName   = DB::table('productos')->select('id','nombre')->get();
        $managType = DB::table('Ceti_areas')->get();    

               
        foreach($managType as $ma)
             $managers[$ma->id] = $ma->name_area;

        foreach($goodnes as $good)       
           array_push($products,$good->id .' '. $good->producto_id);  
        

       foreach($prodName as $prod){
            if(! isset($products_name[$prod->id])){
                $products_name[$prod->id] = $prod->nombre;    
            }
        }        

        return response()->json(["ids" => $products , 
            "prod" => $products_name ,"manag"=>$managers]);
     }

     public function assignGood(Request $request){
        
            
            $ids_name = array();  
            $users = DB::table('users')->get();    
            $usr_father = 0;    
            
            foreach($users as $usr)
            {
               $ids_name[$usr->id] = $usr->manager_id; 
            }

            $usr_father = $ids_name[4];
            if($usr_father == $ids_name[$usr_father])
            {
                var_dump("llego a su tope");
            }                        
            else
            {
                while($usr_father !=  $ids_name[$usr_father])
                {
                    var_dump($usr_father);                
                    
                    $usr_father = $ids_name[$usr_father];
                    var_dump($usr_father);
                }
            }     


     }

     public function assignManager(Request $request)
     {
        $dtils = new Details_item;
      //  var_dump($request->all());
        $manager =  Ceti_areas::find($request->input("id_area"));
                
        $dtils->id_user = $manager->user_id;
        $dtils->id_item = $request->input("id_item");
        $dtils->id_area = $request->input("id_area");
        $dtils->is_manager = true;
        $dtils->is_user = false;
        $dtils->save(); 
        $findItem = Bien::find($request->input("id_item"));
        $findItem->id_details_bien = $dtils->id;
        $findItem->asigando = true;
        $findItem->save();        
        
        return response()->json(["idManager" => $manager->user_id]);
     }
    
}
