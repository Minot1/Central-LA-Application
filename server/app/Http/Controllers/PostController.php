<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    //
    function addPost(Request $req)
    {
        $post= new Post;
        $post->username=$req->input('username');
        $post->faculty=$req->input('faculty');
        $post->class=$req->input('class');
        $post->deadline=$req->input('deadline');
        $post->term=$req->input('term');
        $post->title=$req->input('title');
        $post->description=$req->input('description');
        $post->questions=$req->input('questions');
        $post->mingrade=$req->input('mingrade');
        $post->save();
        return $post;
    }

    function listPost()
    {
        return Post::all();
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
        return Post::find($id);
    }

    function search($key)
    {
        return Post::where('title', 'Like', "%$key%")->get();
    }

    function updatePost(Request $req, $id)
    {
        $post= Post::find($id);
        $post->username=$req->input('username');
        $post->faculty=$req->input('faculty');
        $post->class=$req->input('class');
        $post->deadline=$req->input('deadline');
        $post->term=$req->input('term');
        $post->title=$req->input('title');
        $post->description=$req->input('description');
        $post->questions=$req->input('questions');
        $post->mingrade=$req->input('mingrade');
        $post->save();
        return $post;
    }
}
