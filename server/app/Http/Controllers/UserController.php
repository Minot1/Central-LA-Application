<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Instructor;
use App\Models\Student;
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
        $serviceUrl = "http%3A%2F%2Flocalhost:3000%2Fhome";
        $res = Http::get("https://login.sabanciuniv.edu/cas/serviceValidate?service=$serviceUrl&ticket=$ticket");

        $xml = simplexml_load_string($res, null, null, 'cas', true);
        $json = json_encode($xml);
        $array = json_decode($json,TRUE);

        if(array_key_exists("authenticationFailure",$array)){
            return $array;
        }
        else{
            $role = $array["authenticationSuccess"]["attributes"]["ou"][2];
            if($role == 'student'){
                $result= Student::where('student_username', $array["authenticationSuccess"]["user"])->value('student_username');
                $date = date_create()->format('Y-m-d H:i:s');
                if(!$result)
                {
                    $newStudent= new Student;
                    $newStudent->student_username=$array["authenticationSuccess"]["user"];
                    $newStudent->name=$array["authenticationSuccess"]["attributes"]["displayName"];
                    $newStudent->created_at=$date;
                    $newStudent->updated_at=$date;
                    $newStudent->save();
                }
                else{
                    $student= Student::where('student_username', $array["authenticationSuccess"]["user"])->update(["updated_at"=>$date]);
                }
            }
            //instructor response needed
            //else{
                //instructor response needed
            //}

            $jwt = JWT::encode([
                'role' => $role,
                'iat' => time(),
                "exp" => time() + 60 * 60 * 4
            ], env('JWT_SECRET'),'RS256');
            $array["JWT_TOKEN"] = $jwt;
            return $array;
        }
    }

    function instructors()
    {
        $instructors = Instructor::all();
        return $instructors;
    }

    function students()
    {
        $students = Student::all();
        return $students;
    }
}
