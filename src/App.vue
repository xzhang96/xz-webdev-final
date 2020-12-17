<template>
    <div id="app" data-app>
        <v-app>
            <page-header />
            <main>
                <v-container>
                    <router-view />
                </v-container>
                <br />
                <br />
            </main>
        </v-app>
    </div>
</template>

<script>
import PageHeader from '@/components/Header.vue';
export default {
    name: 'app',
    components: {
        PageHeader,
    },
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.error {
    font-weight: bold;
    color: red;
}
</style>
