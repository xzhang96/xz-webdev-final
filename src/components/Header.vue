<template>
<div>
  <v-toolbar fixed class="teal" dark>
    <v-toolbar-items class="mr-4">
      <v-btn
        class="teal"
        @click="navigateTo({name: 'home'})"
        depressed
        dark>
        RECIPE
      </v-btn>

      <v-btn
        class="teal"
        @click="navigateTo({name: 'recipe'})"
        depressed
        dark>
        Browse
      </v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items>
      <v-btn
        class="teal"
        @click="navigateTo({name: 'login'})"
        v-if="!$store.state.isUserLoggedIn"
        depressed
        dark>
        Login
      </v-btn>

      <v-btn
        class="teal"
        @click="navigateTo({name: 'register'})"
        v-if="!$store.state.isUserLoggedIn"
        depressed
        dark>
        Register
      </v-btn>

      <v-btn
        class="teal"
        v-if="$store.state.isUserLoggedIn"
        depressed
        dark
        >
        My Pantry
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
// import {mapState} from 'vuex'
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
