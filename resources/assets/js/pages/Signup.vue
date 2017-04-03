<template>
    <main-layout>
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">Sign up</div>
                        <div class="panel-body">
                            <form>
                                <div class="form-group" v-bind:class="{'has-error':getErrorState('email')}">
                                    <label for="InputEmail1">Email address</label>
                                    <input v-model="email" type="email" class="form-control" id="InputEmail1" placeholder="Email">
                                    <span v-if="getErrorState('email')" id="helpBlockEmail" class="help-block">{{errors.email[0]}}</span>
                                </div>
                                <div class="form-group" v-bind:class="{'has-error':getErrorState('name')}">
                                    <label for="InputName1">Username</label>
                                    <input v-model="name" type="text" class="form-control" id="InputName1" placeholder="Username">
                                    <span v-if="getErrorState('name')" id="helpBlockName" class="help-block">{{errors.name[0]}}</span>
                                </div>
                                <div class="form-group" v-bind:class="{'has-error':getErrorState('sex')}">
                                    <label >Sex</label>
                                    <p/>
                                    <label class="radio-inline">
                                        <input v-model="sex" type="radio" name="inlineRadioOptions" value="male">Male
                                    </label>
                                    <label class="radio-inline">
                                        <input v-model="sex" type="radio" name="inlineRadioOptions" value="female">Female
                                    </label>
                                    <span v-if="getErrorState('sex')" id="helpBlockSex" class="help-block">{{errors.sex[0]}}</span>
                                </div>
                                <div class="form-group" v-bind:class="{'has-error':getErrorState('password')}">
                                    <label for="InputPassword1">Password</label>
                                    <input v-model="password" type="password" class="form-control" id="InputPassword1" placeholder="Password">
                                    <span v-if="getErrorState('password')" id="helpBlockPassword" class="help-block">{{errors.password[0]}}</span>
                                </div>
                                <div class="form-group" v-bind:class="{'has-error':getErrorState('confirm')}">
                                    <label for="InputPassword2">Comfirm Password</label>
                                    <input  v-model="confirm" type="password" class="form-control" id="InputPassword2" placeholder="Comfirm Password">
                                    <span v-if="getErrorState('confirm')" id="helpBlockComfirm" class="help-block">{{errors.confirm[0]}}</span>
                                </div>
                                <div class="form-group" v-bind:class="{'has-error':getErrorState('motto')}">
                                    <label for="InputMotto1">Motto</label>
                                    <textarea v-model="motto" class="form-control" rows="3" id="InputMotto1" placeholder="Please input your motto, less than 140 characters."></textarea>
                                    <span v-if="getErrorState('motto')" id="helpBlockMotto" class="help-block">{{errors.motto[0]}}</span>
                                </div>
                                <button v-on:click="postForm" class="btn btn-default">Submit</button>
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
                name:'',
                password:'',
                confirm:'',
                sex:'',
                motto:'',
                errors:{},
            };
            return data
        },
        methods: {
            postForm: function (event){
                event.preventDefault();
                axios({
                    method: 'post',
                    url: '/api/v1/signup',
                    headers: {'Content-Type': 'application/json'},
                    data: JSON.stringify({
                        email:this.email,
                        name:this.name,
                        password:this.password,
                        confirm:this.confirm,
                        sex:this.sex,
                        motto:this.motto,
                    })
                })
                    .then((response) => {
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
                    .catch((response) => {
                        console.log(response);
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