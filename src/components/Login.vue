<template>
<div class="login">
    <v-flex xs12>
      <h1>Login</h1>
      <div>
        <v-form ref="form">
          <v-text-field
            class="label-left"
            v-model="email"
            label="Email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            class="label-left"
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn
            dark
            class="teal"
            @click="login"
          >
            Login
          </v-btn>
          <v-btn
            dark
            class="teal"
            @click="clear">
            Clear
          </v-btn>
        </v-form>
      </div>
      <br>
      <div class="myerror" v-html="error"/>
    </v-flex>
</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    clear () {
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myerror {
  color: red
}
.login {
  margin-top: 60px;
}
</style>
