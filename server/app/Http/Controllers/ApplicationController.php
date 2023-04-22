<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Student;



class ApplicationController extends Controller
{
    function addApplication(Request $req)
    {
        $application= new Application;
        $application->stu_id=$req->input('stu_id');
        $application->grade=$req->input('grade');
        $application->faculty=$req->input('faculty');
        
        $parser = new \Smalot\PdfParser\Parser();
        $pdf = $req->file('pdf');
        $pdff = $parser->parseFile($pdf->path());
        $pdfFile = $pdff->getText();

        $application->transcript=$pdfFile;
        $application->working_hours=$req->input('working_hours');
        $application->status=$req->input('status');
        $application->post_id=$req->input('post_id');
        $application->created_at=date_create()->format('Y-m-d H:i:s');
        $application->updated_at=date_create()->format('Y-m-d H:i:s');
        $application->save();

        return $application;
    }

    function updateApplication(Request $req, $id)
    {
        $application= Application::find($id);
        $application->stu_id=$req->input('stu_id');
        $application->grade=$req->input('grade');
        $application->faculty=$req->input('faculty');
        $application->transcript=$req->input('transcript');
        $application->working_hours=$req->input('working_hours');
        $application->status=$req->input('status');
        $application->post_id=$req->input('post_id');
        $application->updated_at=date_create()->format('Y-m-d H:i:s');
        $application->save();

        return $application;
    }

    function listApplication()
    {
        $result = Application::all();   
        return $result;
    }

    function listStudentApplication($username)
    {
        $result = Application::where('username', $username)->get();
        return $result;
    }

    function listPostApplication($post_id)
    {
        $result = Application::where('post_id', $post_id)->get();
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
        return $result;
    }
}
