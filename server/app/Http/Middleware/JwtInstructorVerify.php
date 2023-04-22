<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use \Firebase\JWT\JWT;

use Firebase\JWT\Key;

class JwtInstructorVerify
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
        $authorizationHeader = explode(' ',$request->header('Authorization'));
        $head = isset($authorizationHeader[0]) ? $authorizationHeader[0]: false;
        $jwt = isset($authorizationHeader[1]) ? $authorizationHeader[1]: false;

        if(!$head || !$jwt){
            return response()->json([
                'status' => 403,
                'reply' => 'Unauthorized'
            ]);
        }
        try{
            
            $secretKey = env('JWT_PUB');
            
            $decoded = JWT::decode($jwt, new Key($secretKey, 'RS256'));
            if ($decoded->role == "student"){
                return response()->json([
                    'status' => 403,
                    'reply' => 'You are not Instructor'
                ], 403);
            }
            $request->attributes->add(['decoded' => $decoded, 'jwt' => $jwt]);
            return $next($request);
        } catch (ExpiredException $e) {
            return response()->json([
                'status' => 403,
                'reply' => 'Unauthorized'
            ], 403);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 403,
                'reply' => 'Unauthorized'
            ], 403);
        }
    }
}
