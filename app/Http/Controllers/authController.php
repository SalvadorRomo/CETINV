<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
use App\Ceti_areas;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\DB;

class authController extends Controller
{
    public function authenticate(Request $request)
    {

        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }

    public function getAuthenticatedUser()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
            

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }
        return response()->json(compact('user'));
    }

    public function registerUser(Request $request){

        $newuser=$request->all();      
        $password=Hash::make($request->input('password'));         
        $newuser['password'] = $password;
        $newuser['idtype'] =  $request->input('idtype');        
        $newuser['manager'] = $request->input('manager');    
        //$newuser['manager_string'] = $request->input('manager_string');    
        $user  = User::create($newuser);
       
        if($user ->idtype == 3)
        {
            $area = Ceti_areas::find($user->idarea);
            $area->user_id = $user->id;
            $area->save();
            return "chava, yo hago las cosas como yo quiero en mis dominios";
        }
        else
        {
            
            return "user created";
            
        }
       
    }

    public static function getTypesData(Request $request){
           
            $types = array();
            $areas = array(); 
            $managers = array();

            $usersType = DB::table('user_type')->get();
            $areasType = DB::table('ceti_areas')->get();
            $managType = DB::table('users')->where('manager', 1)->get();    
            $adminId   =  DB::table('users')->where('idtype',1)->get();
            $idAdmin  = 0;

            foreach($adminId as $ad ) 
                $idAdmin = $ad->id;

            foreach( $usersType  as  $it)
                $types[$it->id] = $it->type;
           
            foreach($areasType as $ar)
                $areas[$ar->id] = $ar->name_area;
                
            foreach($managType as $ma)
                $managers[$ma->id] = $ma->name;
            
            
            return response()->json(["ids" =>$types,
                     "areas_ceti" => $areas, "managers"=> $managers , "admin" =>  $idAdmin]);        
    }
 
}
