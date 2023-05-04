<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Answer;
use App\Models\Student;


class ApplicationController extends Controller
{
    function addApplication(Request $req)
    {
        $application = new Application;
        $application->student_username = $req->input('student_username');
        $application->grade = $req->input('grade');
        $application->faculty = $req->input('faculty');

        $parser = new \Smalot\PdfParser\Parser();
        $pdf = $req->file('transcript');
        $pdff = $parser->parseFile($pdf->path());
        $pdfFile = $pdff->getText();

        $application->transcript = $pdfFile;
        // $application->transcript = $req->input('transcript');
        $application->working_hours = $req->input('working_hours');
        $application->status = $req->input('status');
        $application->post_id = $req->input('post_id');
        $application->created_at = date_create()->format('Y-m-d H:i:s');
        $application->updated_at = date_create()->format('Y-m-d H:i:s');
        $application->save();
        $application_id = $application->id;

        $answers = $req->input('answers');
        $decoded_answers = json_decode($answers, TRUE);
        foreach ($decoded_answers as $ans) {
            $answer = new Answer;
            $answer->application_id = $application_id;
            $answer->question_id = $ans["question_id"];
            $answer->answer = $ans["answer"];
            $answer->save();
        }
        return ["result" => "Application has been added"];
    }

    function updateApplication(Request $req, $id)
    {
        $application = Application::find($id);
        $application->student_username = $req->input('student_username');
        $application->grade = $req->input('grade');
        $application->faculty = $req->input('faculty');
        //$application->transcript=$req->input('transcript');
        $application->working_hours = $req->input('working_hours');
        $application->status = $req->input('status');
        $application->post_id = $req->input('post_id');
        $application->updated_at = date_create()->format('Y-m-d H:i:s');
        $application->save();

        $application_id = $application->id;
        $answers = $req->input('answers');

        foreach ($answers as $ans) {
            $answer = Answer::find($ans["id"]);
            $answer->answer = $ans["answer"];
            $answer->save();
        }
        $result = $application;
        $result = json_decode($result, TRUE);
        $answers = Answer::where('application_id', $application_id)->get();
        $answers = json_decode($answers, TRUE);
        $result["answers"] = $answers;

        $student = Student::where('student_username', $result["student_username"])->value("name");
        $result["student_name"] = $student;
        $result = json_encode($result, TRUE);

        return $result;
    }

    function listApplication()
    {
        $results = Application::all();
        $results = json_decode($results, TRUE);
        foreach ($results as &$result) {
            $answers = Answer::where('application_id', $result["id"])->get();

            $answers = json_decode($answers, TRUE);
            $result["answers"] = $answers;

            $student = Student::where('student_username', $result["student_username"])->value("name");
            $result["student_name"] = $student;
        }
        $results = json_encode($results, TRUE);
        return $results;
    }

    function listStudentApplication($username)
    {
        $results = Application::where('student_username', $username)->get();
        $results = json_decode($results, TRUE);
        foreach ($results as &$result) {
            $answers = Answer::where('application_id', $result["id"])->get();

            $answers = json_decode($answers, TRUE);
            $result["answers"] = $answers;

            $student = Student::where('student_username', $result["student_username"])->value("name");
            $result["student_name"] = $student;
        }
        $results = json_encode($results, TRUE);
        return $results;
    }

    function listPostApplication($post_id)
    {
        $results = Application::where('post_id', $post_id)->get();
        $results = json_decode($results, TRUE);
        foreach ($results as &$result) {
            $answers = Answer::where('application_id', $result["id"])->get();

            $answers = json_decode($answers, TRUE);
            $result["answers"] = $answers;

            $student = Student::where('student_username', $result["student_username"])->value("name");
            $result["student_name"] = $student;
        }
        $results = json_encode($results, TRUE);
        return $results;
    }

    function deleteApplication($id)
    {
        $result = Application::where('id', $id)->delete();
        $answers = Answers::where('application_id', $result["$id"])->delete();
        if ($result) {
            return ["result" => "Application has been deleted"];
        } else {
            return ["result" => "Operation failed"];
        }
    }

    function getApplication($id)
    {
        $result = Application::find($id);
        $result = json_decode($result, TRUE);
        $answers = Answer::where('application_id', $result["id"])->get();
        $answers = json_decode($answers, TRUE);
        $result["answers"] = $answers;
        $student = Student::where('student_username', $result["student_username"])->value("name");
        $result["student_name"] = $student;
        $result = json_encode($result, TRUE);
        return $result;
    }

    function getGrade(Request $req, $id)
    {
        $application = Application::find($id);
        $transcript = $application->transcript;
        $lines = explode("\n", $transcript);
        $in_progress = explode("\t", $req->courceCode);
        if (count($in_progress) != 2) {
            return "invalid course code";
        }
        $in_progress_string = strval($in_progress[0]) . " \t" . strval($in_progress[1]);
        $grade = null;

        foreach ($lines as $line) {
            if (strpos($line, $req->courceCode) !== false) {
                $columns = explode("\t", substr($line, strpos($line, $req->courceCode)));
                $grade = $columns[4];

                break;
            }
            if (strpos($line, $in_progress_string) !== false) {
                $columns = explode("\t", substr($line, strpos($line, $in_progress_string)));
                $grade = $columns[6];

                break;
            }
        }

        return $grade;
    }
}
