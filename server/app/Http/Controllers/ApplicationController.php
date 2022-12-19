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
        $application->grade=$req->input('grade');
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
        $application->grade=$req->input('grade');
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
        $result = Application::all();
        foreach($result as $row)
        {
            $row['answers']= json_decode($row['answers'],TRUE);
        }
        return $result;
    }

    function listStudentApplication($username)
    {
        $result = Application::where('username', $username)->get();
        foreach($result as $row)
        {
            $row['answers']= json_decode($row['answers'],TRUE);
        }
        return $result;
    }

    function listPostApplication($post_id)
    {
        $result = Application::where('post_id', $post_id)->get();
        foreach($result as $row)
        {
            $row['answers']= json_decode($row['answers'],TRUE);
        }
        return $result;
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
        $result = Application::where('id', $id) ->get();
        foreach($result as $row)
        {
            $row['answers']= json_decode($row['answers'],TRUE);
        }
        return $result;
    }
}
