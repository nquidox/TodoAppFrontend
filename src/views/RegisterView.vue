<script>
import axios from "axios";
export default {
  name: "RegisterView",

  data() {
    return {
      email: "",
      password1: "",
      password2: "",
      login: "",
      name: "",
      surname: "",
      createSuccess: false,
    }
  },
  methods: {
    async createUserReq(){
      await axios.post(`/user`, {
        email: this.email,
        password: this.password1,
        login: this.login,
        name: this.name,
        surname: this.surname
      });
    },

    async createUser(){
      if (this.email !== "" && this.password1 === this.password2){
        this.login = this.email.split("@")[0];
        await this.createUserReq();

      this.createSuccess = true;
      }
    }
  },
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center" v-if="createSuccess === false">
      <div class="col-4 m-3">
        <form id="login_form" @submit.prevent="createUser">
          <h1 class="h3 mb-3 fw-normal text-center">Register new account</h1>

          <div class="form-floating mt-4">
            <input v-model="email" type="text" class="form-control" id="floatingInput" placeholder="username" required />
            <label for="floatingInput">Email</label>
          </div>

          <div class="form-floating mt-2">
            <input v-model="password1" type="password" class="form-control" id="floatingPassword" placeholder="Password" required />
            <label for="floatingPassword">Password</label>
          </div>

          <div class="form-floating mt-2">
            <input v-model="password2" type="password" class="form-control" id="floatingPassword" placeholder="Password" required />
            <label for="floatingPassword">Repeat password</label>
          </div>

          <button class="btn btn-primary w-100 py-2 mt-2" @click="login" type="submit">Create</button>
          <p class="mt-5 mb-3 text-body-secondary text-center">2024</p>
        </form>
      </div>
    </div>

    <div class="row justify-content-center mt-3" v-else>
      <span class="fs-3 text-center">Account created.</span>
      <span class="fs-4 text-center">Please check your email for verification link to continue.</span>
    </div>
  </div>
</template>

<style scoped>

</style>