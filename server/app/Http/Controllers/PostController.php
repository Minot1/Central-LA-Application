<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Question;
use App\Models\Instructor;

class PostController extends Controller
{
    //
    function addPost(Request $req)
    {
        $post= new Post;
        $post->instructor_username=$req->input('instructor_username');
        $post->faculty=$req->input('faculty');
        $post->courseCode=$req->input('courseCode');
        $post->deadline=$req->input('deadline');
        $post->term=$req->input('term');
        $post->title=$req->input('title');
        $post->description=$req->input('description');
        $post->mingrade=$req->input('mingrade');
        $post->auth_instructors=json_encode($req->input('auth_instructors'),TRUE);
        $post->created_at=date_create()->format('Y-m-d H:i:s');
        $post->updated_at=date_create()->format('Y-m-d H:i:s');
        $post->save();
        $post_id = $post->id;
        $questions = $req->input('questions');
        
        foreach ($questions as $q) {
            $question= new Question;
            $question->post_id = $post_id;
            $question->type = $q["type"];      
            $question->ranking = $q["ranking"];
            $question->question = $q["question"];
            $question->multiple_choices = json_encode($q["multiple_choices"],TRUE);;
            $question->save();
        }
        return ["result"=>"Post has been added"];
    }

    function listPost()
    {
        $results = Post::all();
        foreach($results as $row)
        {
            $row['auth_instructors']= json_decode($row['auth_instructors'],TRUE);
        }
        $results = json_decode($results,TRUE);
        foreach ($results as &$result){
            $questions = Question::where('post_id',$result["id"])->get();
            $questions = json_decode($questions,TRUE);
            $result["questions"] = $questions;

            $instructor = Instructor::where('instructor_username',$result["instructor_username"])->value("name");
            $result["instructor_name"] = $instructor;
        }
        $results = json_encode($results,TRUE);
        return $results;
    }

    function deletePost($id)
    {
        $result= Post::where('id', $id) ->delete();
        if($result)
        {
          return ["result"=>"Post has been deleted"];
        }
        else
        {
        return ["result"=>"Operation failed"];
        }
    }

    function getPost($id)
    {
        $result = Post::find($id);
        $result = json_decode($result,TRUE);
        $questions = Question::where('post_id',$result["id"])->get();
        $questions = json_decode($questions,TRUE);
        $result["questions"] = $questions;
        $instructor = Instructor::where('instructor_username',$result["instructor_username"])->value("name");
        $result["instructor_name"] = $instructor;
        $result = json_encode($result,TRUE);
        return $result;
    }

    function search($key)
    {
        $results = Post::where('title', 'Like', "%$key%")->get();
        foreach($results as $row)
        {
            $row['auth_instructors']= json_decode($row['auth_instructors'],TRUE);
        }
        $results = json_decode($results,TRUE);
        foreach ($results as &$result){
            $questions = Question::where('post_id',$result["id"])->get();
            
            $questions = json_decode($questions,TRUE);
            $result["questions"] = $questions;

            $instructor = Instructor::where('instructor_username',$result["instructor_username"])->value("name");
            $result["instructor_name"] = $instructor;
        }
        $results = json_encode($results,TRUE);
        return $results;
    }

    function updatePost(Request $req, $id)
    {
        $post= Post::find($id);
        $post->faculty=$req->input('faculty');
        $post->courseCode=$req->input('courseCode');
        $post->deadline=$req->input('deadline');
        $post->term=$req->input('term');
        $post->title=$req->input('title');
        $post->description=$req->input('description');
        $post->auth_instructors=$req->input('auth_instructors');
        $post->mingrade=$req->input('mingrade');
        $post->updated_at=date_create()->format('Y-m-d H:i:s');
        $post->save();
        $post_id = $post->id;
        $questions = $req->input('questions');
        
        foreach ($questions as $q) {
            $question= Question::find($q["id"]);
            $question->post_id = $post_id;
            $question->type = $q["type"];      
            $question->ranking = $q["ranking"];
            $question->question = $q["question"];
            $question->multiple_choices = json_encode($q["multiple_choices"],TRUE);;
            $question->save();
        }
        $result = $post;
        $result = json_decode($result,TRUE);
        $questions = Question::where('post_id',$result["id"])->get();
        $questions = json_decode($questions,TRUE);
        $result["questions"] = $questions;
        $instructor = Instructor::where('instructor_username',$result["instructor_username"])->value("name");
        $result["instructor_name"] = $instructor;
        $result = json_encode($result,TRUE);
        return $result;
    }
}
