<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\User;
use \Firebase\JWT\JWT;

class UserController extends Controller
{
    //
    function login(Request $req)
    {
        $user = User::where('username', $req->username)->first();
        if(!$user||($req->password != $user->password))
        {
            return ["result"=>"Wrong username or password"];
        }
        return $user;
    }

    function serviceValidate(Request $req){
        $ticket = $req->input('ticket');
        $serviceUrl = $req->input('serviceUrl');
        $res = Http::get("https://login.sabanciuniv.edu/cas/serviceValidate?service=$serviceUrl&ticket=$ticket");

        $xml = simplexml_load_string($res, null, null, 'cas', true);
        $json = json_encode($xml);
        $array = json_decode($json,TRUE);

        if(array_key_exists("authenticationFailure",$array)){
            return $array;
        }
        else{
        $jwt = JWT::encode([
            'role' => $array["authenticationSuccess"]["attributes"]["ou"][2],
            'iat' => time(),
            "exp" => time() + 60 * 60 * 4
        ], env('JWT_SECRET'),'RS256');
        $array["JWT_TOKEN"] = $jwt;
        return $array;
        }
    }
}
