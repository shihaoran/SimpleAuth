<?php
/**
 * Created by PhpStorm.
 * User: shi
 * Date: 2017/4/2
 * Time: 下午11:17
 */
namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class SignInRequest extends FormRequest
{
    public function rules()
    {
        return Config::get('validator.signin.validation_rules');
    }

    public function authorize()
    {
        return true;
    }
}