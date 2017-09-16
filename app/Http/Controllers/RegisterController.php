<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuthException\JWTException;

class RegisterController extends Controller
{
    public function authenticate(Request $request){
        $credentials = $request->all();
        var_dump($credentials);
        
        // try{

        //     if(!$token = JWTAuth::attemp($credentials)){
        //         return $this->response->json(['error'=>'No coincide alguno de los datos que estas pasando'],401);
        //     }

        // }catch(JWTException $ex){
        //     return $this->response->json(['error'=>'Hubo algunos problemas'],500);
        // }

        // return $this->response->json(compact('token'));
    }

}
