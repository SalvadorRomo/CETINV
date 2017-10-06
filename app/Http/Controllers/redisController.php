<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7;
use Auth;
class redisController extends Controller
{
   
    public function register(Request $r)
    {        
         $user = Auth::User();   
         $data = ['data'=> [
                'id'    => $user->id,
                'email'  => $user->name
          ] 
        ];
        
        $client = new Client();     
       
        
        //try {
        $res = $client->request('POST','http://localhost:8080/registerUser',['data' =>[$user->id,$user->name]]);
        var_dump($res);
    //} catch (RequestException $e) {
      //      echo Psr7\str($e->getRequest());
        //    if ($e->hasResponse()) {
          //      echo Psr7\str($e->getResponse());
           // }
       // }
       // var_dump( $res->getBody());
        //respondemos al cliente
        
    }
}
