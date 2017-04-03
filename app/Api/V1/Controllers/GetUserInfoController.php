<?php
/**
 * Created by PhpStorm.
 * User: shi
 * Date: 2017/4/3
 * Time: 下午8:01
 */
namespace App\Api\V1\Controllers;

use Config;
use App\User;
use Tymon\JWTAuth\JWTAuth;

use App\Http\Controllers\Controller;


class GetUserInfoController extends Controller
{
    public function getUserInfo(JWTAuth $JWTAuth)
    {
        $user = $JWTAuth->parseToken()->authenticate();

        return response()->json([
            'name' => $user['name'],
            'email' => $user['email'],
            'sex' => $user['sex'],
            'motto' => $user['motto']
        ], 201);
    }
}