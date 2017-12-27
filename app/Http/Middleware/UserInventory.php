<?php

namespace App\Http\Middleware;

use Closure;

class UserInventory
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $usr = $request->user(); 
        $id = (int)$usr->idtype;
        if($id == 2)
        {
            return $next($request);
        }
        else
        {
           return response('no', 503);
        }
    }
}
