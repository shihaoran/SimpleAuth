<?php
/**
 * Created by PhpStorm.
 * User: shi
 * Date: 2017/4/2
 * Time: 下午11:01
 */
return [

    'signup' => [
        'validation_rules' => [
            'name' => 'required|max:32',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'confirm' => 'required|min:6|same:password',
            'sex' => 'required|in:male,female',
            'motto' => 'required|max:140',
        ]
    ],

    'signin' => [
        'validation_rules' => [
            'email' => 'required|email',
            'password' => 'required'
        ]
    ],

    'forgot_password' => [
        'validation_rules' => [
            'email' => 'required|email'
        ]
    ],

    'reset_password' => [
        'release_token' => env('PASSWORD_RESET_RELEASE_TOKEN', false),
        'validation_rules' => [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed'
        ]
    ]

];