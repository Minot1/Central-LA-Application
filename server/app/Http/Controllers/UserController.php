<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\User;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;

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
        $serviceUrl = "http%3A%2F%2Flocalhost:3000%2Fhome";
        $res = Http::get("https://login.sabanciuniv.edu/cas/serviceValidate?service=$serviceUrl&ticket=$ticket");
        error_log($res);
        return $res;
    }
}
