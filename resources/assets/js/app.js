
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
    computed: {
        ViewComponent () {
            const matchingView = routes[this.currentRoute]
            return matchingView
                ? require('./pages/' + matchingView + '.vue')
                : require('./pages/404.vue')
        }
    },
    watch: {
        token: function (val, oldVal) {
            axios({
                method: 'get',
                url: '/api/v1/getUserInfo',
                headers: {'Authorization':'Bearer '+val},
            })
                .then((response) => {
                    console.log(response);
                    this.userdata=response.data;
                })
                .catch((response) => {
                    console.log(response);
                    console.log(response.response.data.errors);
                    this.errors=response.response.data.errors;
                });
        },
        login: function (val, oldVal) {
            if(oldVal===true && val===false)
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
