<template>
    <div>
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container-fluid">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand">
                        <v-linkdiv href="/">SimpleAuth</v-linkdiv>
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        &nbsp;
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links -->
                        <li v-if="!this.$root.login"><v-link href="/signin">Signin</v-link></li>
                        <li v-if="!this.$root.login"><v-link href="/signup">Signup</v-link></li>
                        <li class="dropdown">
                        <a  v-if="this.$root.login" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                            {{this.$root.userdata.name}} <span class="caret"></span>
                        </a>

                        <ul v-if="this.$root.login" class="dropdown-menu" role="menu">
                            <li>
                                <a v-on:click="logOut" >
                                    Logout
                                </a>
                            </li>
                        </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <slot></slot>
    </div>
</template>

<script>
    import VLink from '../components/VLink.vue'
    import VLinkdiv from '../components/VLinkdiv.vue'
    export default {
        components: {
            VLink,
            VLinkdiv,
        },
        methods: {
            logOut: function (){
                this.$root.login=false;
            }
        },
    }
</script>

