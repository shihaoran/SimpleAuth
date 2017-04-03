<template>
    <main-layout>
        <div class="jumbotron" style="background-color: transparent">
            <div v-if="this.$root.login" class="container">
                <h2>You are logged in!</h2>
                <p></p>
                <h2>Username</h2>
                <p>{{this.$root.userdata.name}}</p>
                <h2>Email</h2>
                <p>{{this.$root.userdata.email}}</p>
                <h2>Sex</h2>
                <p>{{this.$root.userdata.sex}}</p>
                <h2>Motto</h2>
                <p>{{this.$root.userdata.motto}}</p>
                <a v-on:click="logOut" class="btn btn-primary btn-lg" role="button">Log out</a>
             </div>
            <div v-else class="container">
                <h2>SimpleAuth</h2>
                <p>A simple login interface based on Laravel and Vue.js</p>
                <a class="btn btn-primary btn-lg" role="button"><v-linkdiv href="/signin">Sign in</v-linkdiv></a>
                <a class="btn btn-success btn-lg" role="button"><v-linkdiv href="/signup">Sign up</v-linkdiv></a>
            </div>
        </div>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'
    import VLink from '../components/VLink.vue'
    import VLinkdiv from '../components/VLinkdiv.vue'
    export default {
        components: {
            MainLayout,
            VLink,
            VLinkdiv
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
            logOut: function (){
                this.$root.login=false;
            }
        },
    }
</script>