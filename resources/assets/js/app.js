
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import routes from './routes'

const app = new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname,
        token:'',
        userdata:'',
        login:false,
    },
    created: function () {
        var _token=localStorage.getItem('token');
        var callback=()=>{
            this.login=true;
            this.token=_token;
        };
        if(_token!==null)
            this.getUserInfo(_token,callback);
    },
    computed: {
        ViewComponent () {
            const matchingView = routes[this.currentRoute]
            return matchingView
                ? require('./pages/' + matchingView + '.vue')
                : require('./pages/404.vue')
        }
    },
    methods: {
        getUserInfo: function (token,callback){
            axios({
                method: 'get',
                url: '/api/v1/getUserInfo',
                headers: {'Authorization':'Bearer '+token},
            })
                .then((response) => {
                    this.userdata=response.data;
                    callback();
                })
                .catch((response) => {
                    console.log(response);
                });
        }
    },
    watch: {
        token: function (val, oldVal) {
            console.log(val);
            if(val!=='')
            {
                this.getUserInfo(val);
                localStorage.setItem('token', val);
            }
            else
            {
                localStorage.removeItem('token');
            }
        },
        login: function (val, oldVal) {
            if(val===false)
                this.token='';
        },
    },
    render (h) {
        return h(this.ViewComponent)
    }
})

window.addEventListener('popstate', () => {
    app.currentRoute = window.location.pathname
})
