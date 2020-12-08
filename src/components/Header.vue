<template>
<div>
  <v-toolbar fixed class="teal" dark>
    <v-toolbar-items class="mr-4">
      <v-btn
        class="teal"
        @click="navigateTo({name: 'home'})"
        outlined
        dark>
        RECIPE
      </v-btn>
    </v-toolbar-items>
    <!-- <v-toolbar-items>
      <v-btn flat dark>
        BROWSE
      </v-btn>
    </v-toolbar-items> -->
    <v-spacer />
    <v-toolbar-items>
      <v-btn
        class="teal"
        @click="navigateTo({name: 'login'})"
        outlined
        link
        text
        dark>
        Login
      </v-btn>
      <v-btn
        class="teal"
        @click="navigateTo({name: 'register'})"
        outlined
        link
        text
        dark>
        Register
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</div>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
