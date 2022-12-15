<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;

class ApplicationController extends Controller
{
    function addApplication(Request $req)
    {
        $application= new Application;
        $application->username=$req->input('username');
        $application->name=$req->input('name');
        $application->student_id=$req->input('student_id');
        $application->class=$req->input('class');
        $application->faculty=$req->input('faculty');
        $application->transcript=$req->input('transcript');
        $application->working_hours=$req->input('working_hours');
        $application->answers=$req->input('answers');
        $application->status=$req->input('status');
        $application->post_id=$req->input('post_id');
        $application->save();
        return $application;
    }

    function updateApplication(Request $req, $id)
    {
        $application= Application::find($id);
        $application->username=$req->input('username');
        $application->name=$req->input('name');
        $application->student_id=$req->input('student_id');
        $application->class=$req->input('class');
        $application->faculty=$req->input('faculty');
        $application->transcript=$req->input('transcript');
        $application->working_hours=$req->input('working_hours');
        $application->answers=$req->input('answers');
        $application->status=$req->input('status');
        $application->post_id=$req->input('post_id');
        $application->save();
        return $application;
    }

    function listApplication()
    {
        return Application::all();
    }

    function listStudentApplication($username)
    {
        return Application::where('username', $username)->get();;
    }

    function listPostApplication($post_id)
    {
        return Application::where('post_id', $post_id)->get();;
    }

    function deleteApplication($id)
    {
        $result= Application::where('id', $id) ->delete();
        if($result)
        {
          return ["result"=>"Application has been deleted"];
        }
        else
        {
        return ["result"=>"Operation failed"];
        }
    }

    function getApplication($id)
    {
        return Application::find($id);
    }
}
