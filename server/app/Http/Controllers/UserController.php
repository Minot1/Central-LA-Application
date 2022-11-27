<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

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
}
