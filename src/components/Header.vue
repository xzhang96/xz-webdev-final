<template>
    <div>
        <v-toolbar fixed class="teal" dark>
            <v-toolbar-items class="mr-4">
                <v-btn
                    class="teal"
                    @click="navigateTo({ name: 'home' })"
                    depressed
                    dark
                >
                    Recipe
                </v-btn>
            </v-toolbar-items>
            <v-spacer />
            <v-toolbar-items>
                <v-btn
                    class="teal"
                    :to="{ name: 'login' }"
                    v-if="!$store.state.isUserLoggedIn"
                    depressed
                    dark
                >
                    Login
                </v-btn>

                <v-btn
                    class="teal"
                    :to="{ name: 'register' }"
                    v-if="!$store.state.isUserLoggedIn"
                    depressed
                    dark
                >
                    Register
                </v-btn>

                <v-btn
                    class="teal"
                    v-if="$store.state.isUserLoggedIn"
                    depressed
                    dark
                    :to="{ name: 'profile' }"
                >
                    Profile
                </v-btn>

                <v-btn
                    class="teal"
                    v-if="$store.state.isUserLoggedIn"
                    depressed
                    dark
                    @click="logout"
                >
                    Logout
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
export default {
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        logout() {
            this.$store.dispatch('setToken', null);
            this.$store.dispatch('setUser', null);
            this.$router.push({
                name: 'home',
            });
            window.location.reload();
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
