<template>
    <main-layout>
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">Sign in</div>
                        <div class="panel-body">
                            <form>
                                <div class="form-group" v-bind:class="{'has-error':getErrorState('email')}">
                                    <label for="InputEmail1">Email address</label>
                                    <input v-model="email" type="email" class="form-control" id="InputEmail1" placeholder="Email">
                                    <span v-if="getErrorState('email')" id="helpBlockEmail" class="help-block">{{errors.email[0]}}</span>
                                </div>
                                <div class="form-group" v-bind:class="{'has-error':getErrorState('password')}">
                                    <label for="InputPassword">Password</label>
                                    <input v-model="password" type="password" class="form-control" id="InputPassword" placeholder="Password">
                                    <span v-if="getErrorState('password')" id="helpBlockPassword" class="help-block">{{errors.password[0]}}</span>
                                </div>
                                <button v-on:click="postForm" class="btn btn-default">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'
    import routes from '../routes'
    export default {
        components: {
            MainLayout
        },
        data () {
            const data = {
                email:'',
                password:'',
                errors:{},
            };
            return data
        },
        methods: {
            postForm: function (event){
                event.preventDefault();
                axios({
                    method: 'post',
                    url: '/api/v1/signin',
                    headers: {'Content-Type': 'application/json'},
                    data: JSON.stringify({
                        email:this.email,
                        password:this.password,
                    })
                })
                    .then((response)=> {
                        console.log(response);
                        this.$root.token=response.data.token;
                        this.$root.login=true;
                        this.$root.currentRoute = '/';
                        window.history.pushState(
                            null,
                            routes['/'],
                            '/'
                        );
                    })
                    .catch((response)=> {
                        console.log(response);
                        console.log('error');
                        console.log(response.response.data.errors);
                        this.errors=response.response.data.errors;
                    });
            },
            getErrorState: function (field){
                if(this.errors[field]===undefined)
                    return false;
                else
                    return true;
            }
        },
        computed: {

        },
    }
</script>