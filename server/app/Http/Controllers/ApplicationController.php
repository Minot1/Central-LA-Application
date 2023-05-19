<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Application;
use App\Models\Answer;
use App\Models\Student;
use App\Models\Post;
use App\Models\Course;

function getGrade($desired_courses, $id)
{
    $application = Application::find($id);
    $transcript = $application->transcript;
    $lines = explode("\n", $transcript);
    $courses = json_decode($desired_courses, TRUE);
    $result = array();
    foreach ($courses as $course) {
        $in_progress = explode(" ", $course);
        $course_string = strval($in_progress[0]) . "\t" . strval($in_progress[1]);
        $in_progress_string = strval($in_progress[0]) . " \t" . strval($in_progress[1]);
        $grade = null;

        foreach ($lines as $line) {
            if (strpos($line, $course_string)) {
                $columns = explode("\t", substr($line, strpos($line, $course_string)));
                $grade = $columns[4];
                break;
            }
            if (strpos($line, $in_progress_string)) {
                $columns = explode("\t", substr($line, strpos($line, $in_progress_string)));
                $grade = trim(preg_replace('/\s/u', ' ', $columns[6]));
                break;
            }
        }
        array_push($result, $grade);
    }
    return $result;
}

class ApplicationController extends Controller
{

    function listCourse()
    {
        $results = Course::all()->sort()->pluck('course')->toArray();
        return $results;
    }

    function addApplication(Request $req)
    {
        $application = new Application;
        $application->student_username = $req->input('student_username');
        $application->grade = $req->input('grade');
        $application->faculty = $req->input('faculty');
        $application->post_id = $req->input('post_id');

        $filename = "$application->student_username-"."$application->post_id.pdf";
        $req->file('transcript')->storeAs('transcripts', $filename);

        $parser = new \Smalot\PdfParser\Parser();
        $pdf = $req->file('transcript');
        $pdff = $parser->parseFile($pdf->path());
        $pdfFile = $pdff->getText();
        if (!strpos($pdfFile, "End of Transcript")) {
            return "invalid transcript";
        }

        $application->transcript = $pdfFile;
        // $application->transcript = $req->input('transcript');
        $application->working_hours = $req->input('working_hours');
        $application->status = $req->input('status');
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

        if ($req->hasFile('transcript')) {
            $filename = "$application->student_username-"."$application->post_id.pdf";
            Storage::delete($filename);
            $req->file('transcript')->storeAs('transcripts', $filename);
    
            $parser = new \Smalot\PdfParser\Parser();
            $pdf = $req->file('transcript');
            $pdff = $parser->parseFile($pdf->path());
            $pdfFile = $pdff->getText();
            if (!strpos($pdfFile, "End of Transcript")) {
                return "invalid transcript";
            }
    
            $application->transcript = $pdfFile;
        }


        $application->save();

        $application_id = $application->id;
        $answers = $req->input('answers');
        $decoded_answers = json_decode($answers, TRUE);

        foreach ($decoded_answers as $ans) {
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
        $result["desired_courses"] = getGrade(Post::find($result["post_id"])->desired_courses, $id);
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
            $result["desired_courses"] = getGrade(Post::find($result["post_id"])->desired_courses, $result["id"]);
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
            $result["desired_courses"] = getGrade(Post::find($result["post_id"])->desired_courses, $result["id"]);
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
            $result["desired_courses"] = getGrade(Post::find($result["post_id"])->desired_courses, $result["id"]);
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
        $result["desired_courses"] = getGrade(Post::find($result["post_id"])->desired_courses, $id);
        $result = json_encode($result, TRUE);
        return $result;
    }
}
