<template>
<div class="register">
    <v-flex xs12>
      <h1>Register</h1>
      <div>
        <v-form ref="form" aria-autocomplete="off">
          <v-text-field
            class="label-left"
            v-model="firstName"
            label="First name"
            required
          ></v-text-field>
          <v-text-field
            class="label-left"
            v-model="lastName"
            label="Last name"
            required
          ></v-text-field>
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
            @click="register"
          >
            Register
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
      <v-alert dense outlined type="error" v-if="error !== null">{{error}}</v-alert>
    </v-flex>
</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('profile')
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    clear () {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register {
  margin-top: 60px;
}
</style>
