<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Instructor;

class PostController extends Controller
{
    //
    function addPost(Request $req)
    {
        $post= new Post;
        $post->faculty=$req->input('faculty');
        $post->courseCode=$req->input('courseCode');
        $post->deadline=$req->input('deadline');
        $post->term=$req->input('term');
        $post->title=$req->input('title');
        $post->description=$req->input('description');
        $post->questions=$req->input('questions');
        $post->mingrade=$req->input('mingrade');
        $post->authInstructors=$req->input('authInstructors');
        $post->created_at=date_create()->format('Y-m-d H:i:s');
        $post->updated_at=date_create()->format('Y-m-d H:i:s');
        $post->save();
        return $post;
    }

    function listPost()
    {
        $result = Post::all();
        foreach($result as $row)
        {
            $row['authInstructors']= json_decode($row['authInstructors'],TRUE);
        }
        return $result;
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
        $result = Post::where('id', $id) ->get();
        foreach($result as $row)
        {
            $row['authInstructors']= json_decode($row['authInstructors'],TRUE);
        }
        return $result;
    }

    function search($key)
    {
        $result = Post::where('title', 'Like', "%$key%")->get();
        foreach($result as $row)
        {
            $row['authInstructors']= json_decode($row['authInstructors'],TRUE);
        }
        return $result;
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
        $post->authInstructors=$req->input('authInstructors');
        $post->mingrade=$req->input('mingrade');
        $post->updated_at=date_create()->format('Y-m-d H:i:s');
        $post->save();
        return $post;
    }
}
