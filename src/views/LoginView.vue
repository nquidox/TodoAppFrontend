<script>
import axios from "axios";

export default {
  name: "LoginView",

  data(){
    return {
      form:{
        email:"",
        password:""
      },
    }
  },

  methods: {
    login() {
      axios.post(`/login`, {
        "email": this.form.username,
        "password": this.form.password
      })
    },
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-4 m-3">
        <form id="login_form">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

          <div class="form-floating mt-2">
            <input v-model="form.username" type="text" class="form-control" id="floatingInput" placeholder="username">
            <label for="floatingInput">Username</label>
          </div>

          <div class="form-floating mt-2">
            <input v-model="form.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Password</label>
          </div>

          <button class="btn btn-primary w-100 py-2 mt-2" @click="login" type="button">Sign in</button>
          <p class="mt-5 mb-3 text-body-secondary">2024</p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>