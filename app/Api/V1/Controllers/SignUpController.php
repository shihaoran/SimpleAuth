<?php
/**
 * Created by PhpStorm.
 * User: shi
 * Date: 2017/4/2
 * Time: 下午11:16
 */
namespace App\Api\V1\Controllers;

use Config;
use App\User;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use App\Api\V1\Requests\SignUpRequest;
use Symfony\Component\HttpKernel\Exception\HttpException;

class SignUpController extends Controller
{
    public function signUp(SignUpRequest $request, JWTAuth $JWTAuth)
    {
        $userdata=[
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
            'sex' => $request['sex'],
            'motto' => $request['motto']
        ];//protected for redundant attributes insert into database
        $user = new User($userdata);
        if(!$user->save()) {
            throw new HttpException(500);
        }


        $token = $JWTAuth->fromUser($user);
        return response()->json([
            'status' => 'ok',
            'token' => $token
        ], 201);
    }
}