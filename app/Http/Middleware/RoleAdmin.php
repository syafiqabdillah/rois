<?php

namespace App\Http\Middleware;

use Closure;

class RoleAdmin
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
        if ($request->role != 'admin'){
            return response()->json(['message'=>'unauthorized access attemp', 'status'=>407]);
        }
        return $next($request);
    }
}
