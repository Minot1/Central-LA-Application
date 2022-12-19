<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        "username",
        "faculty",
        "courseCode",
        "deadline",
        "term",
        "title",
        "description",
        "questions",
        "mingrade",
    ];
}
