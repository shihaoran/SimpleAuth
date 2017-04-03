<template>
    <div
            v-bind:href="href"
            v-bind:class="{ active: isActive }"
            v-on:click="go"
    >
        <slot></slot>
    </div>
</template>

<script>
    import routes from '../routes'
    export default {
        props: {
            href: String,
            required: true
        },
        computed: {
            isActive () {
                return this.href === this.$root.currentRoute
            }
        },
        methods: {
            go (event) {
                event.preventDefault()
                this.$root.currentRoute = this.href
                window.history.pushState(
                    null,
                    routes[this.href],
                    this.href
                )
            }
        }
    }
</script>

<style scoped>
    div {
        cursor: pointer;
    }
</style>