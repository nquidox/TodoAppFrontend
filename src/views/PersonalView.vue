<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "PersonalView",

  data() {
    return {
      userinfo: {
        email: "",
        password: "",
        login: "",
        name: "",
        surname: ""},
    }
  },

  methods: {
    getUserinfo(){
      axios.get(`/user/${this.user.userId}`, {withCredentials: true}).then(response => this.userinfo = response.data)
    },
  },

  computed:{
    ...mapGetters(["isAuth", "user"]),
  },

  beforeMount() {
    this.getUserinfo();
  },

}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-4 m-3">
        <ul>
          <li>Login: {{ userinfo.login }}</li>
          <li>Name: {{ userinfo.name }}</li>
          <li>Surname: {{ userinfo.surname }}</li>
          <li>Email: {{ userinfo.email }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>