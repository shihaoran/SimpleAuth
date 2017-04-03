<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

# SimpleAuth
一个`Vue.js`前端和`laravel`后端利用`REST API`进行交互的简单Demo。

##部署说明
前提条件安装`npm` `php` `composer` `MySQL`，配置好环境变量

    $ git clone https://github.com/shihaoran/SimpleAuth.git
    $ composer install
修改根目录下`.env`文件中的数据库配置
    
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=simpleauth
    DB_USERNAME=root
    DB_PASSWORD={your password here}
找到如下部分，将其中的`DB_PASSWORD`改成你的数据库root用户的密码
    
    $ php artisan migrate
    $ php artisan db:seed
以上指令执行完了数据库迁移工作，并在数据库中建立了50条初始用户信息
    
    $ npm run dev
    $ php artisan serve
以开发模式运行，即可在浏览器中打开`localhost:8000`，我们的页面已经显示出来了

##API定义

###登录 signin

    POST  /api/v1/signin   //登录
    
请求格式(JSON)

    {
        "email":"omari27@example.org",
        "password":"123456"
    }
返回值(JSON)
    
    格式错误
    {
        "errors": {
            "email": [
              "The email must be a valid email address."
            ]
    }
    登录错误
    {
      "status": "failed",
      "message": "AccessDenied"
    }
    登录成功
    {
      "status": "ok",
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjExMCwiaXNzIjoiaHR0cDpcL1wvbG9jYWxob3N0OjgwMDBcL2FwaVwvdjFcL3NpZ25pbiIsImlhdCI6MTQ5MTIzNDQ1MiwiZXhwIjoxNDkxMjM4MDUyLCJuYmYiOjE0OTEyMzQ0NTIsImp0aSI6IjZiOWNkOTg3NTc3MTA1YzY5N2JmYjcxNjA5NTM4NTBhIn0.pqJzqYV0N1gL48w2lZKOgEfgLbtwCLq8aAdfjYz75X8"
    }


###注册 signup

    POST  /api/v1/signup   //注册
    
请求格式(JSON)

    {
        "email":"dd@1.c12",
        "name":"sssdfdsfdsf",
        "password":"123456",
        "confirm":"123456",
        "sex":"male",
        "motto":"dfsdfsf"
    }
返回值(JSON)
    
    字段为空/格式错误/长度错误/用户名存在等
    {
        "errors": {
            "email": [
              "The email must be a valid email address."
            ],
            "confirm": [
              "The confirm and password must match."
            ]
          }
    }
    注册成功
    {
      "status": "ok",
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjExMiwiaXNzIjoiaHR0cDpcL1wvbG9jYWxob3N0OjgwMDBcL2FwaVwvdjFcL3NpZ251cCIsImlhdCI6MTQ5MTIzNDYxMiwiZXhwIjoxNDkxMjM4MjEyLCJuYmYiOjE0OTEyMzQ2MTIsImp0aSI6IjhlZGI3NWIyNjBiZmIzYjQyNzgyMzJhYjk3OWU5Nzk4In0.WK2QOcOfdUj7S1uWgUC4kv4-9vK77HuG14Hz7-lki_A"
    }
    
###获取用户信息 getuserinfo

    GET  /api/v1/getuserinfo   //获取用户信息
    
请求格式(JSON)

    header中Authorization字段中的值为'bearer {token}'其中{token}用用户token
返回值(JSON)
    
    token未提供/token过期/token无效等提示在error中
    {
      "error": "token_not_provided"
    }
    成功则返回用户信息
    {
      "name": "sss",
      "email": "dd@1.ccc",
      "sex": "male",
      "motto": "dfsdfsf"
    }


##特性

* 利用`JWT-Auth`实现了基于token的`REST API`下的用户验证
* 利用`Dingo`实现了对`REST API`的支持
* 利用`localstorage`实现了用户登录界面的保存功能
* 利用`laravel`中自带的`Vue.js`与`Bootstrap`支持实现了前端页面
* 利用`laravel`5.4版本新提供的`laravel-mix`工具实现了`webpack`打包

##参考资料

* [laravel官方文档](https://laravel.com/docs/5.4/)
* [Vue官方文档](https://vuejs.bootcss.com/v2/guide/)
* [JWT-Auth文档](https://github.com/tymondesigns/jwt-auth/wiki)
* [Dingo文档](https://github.com/dingo/api/wiki)
* [如何在laravel中建立使用api的前端页面](https://www.sitepoint.com/how-to-consume-laravel-api-with-angularjs/)
* [随机填充数据库工具faker的使用](https://tutorials.kode-blog.com/laravel-5-faker-tutorial)
* [测试api工具Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=zh-CN)