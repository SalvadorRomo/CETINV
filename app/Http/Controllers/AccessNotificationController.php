<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7;
use Auth;
use \Firebase\JWT\JWT;

class AccessNotificationController extends Controller
{
   
    public function register(Request $r)
    {        
        $user = Auth::User();    
        $myfile = fopen( "../keysreq/request.key" , "r") or die("Unable to open file!");
        $key = fread($myfile,filesize("../keysreq/request.key"));
        $info = array(
            "iat" => 1356999524,
            "nbf" => 1357000000,
            "id"  => $user->id,
            "name" =>$user->name   
        ); 
        $jwt = JWT::encode($info, $key, 'RS256');
        return response()->json(["token"=>$jwt]);
    }
}
