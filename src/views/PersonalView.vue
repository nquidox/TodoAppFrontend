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

      sessions: []
    }
  },

  methods: {
    getUserinfo(){
      axios.get(`/user/${this.user.userId}`).then(response => this.userinfo = response.data)
    },

    getAllSessions(){
      axios.get(`/getAllSessions`).then(response => this.sessions = response.data)

    },

    closeOtherSessions(){
      axios.post(`/closeOtherSessions`)
    }

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

      <div class="row">
        <button @click="getAllSessions" type="button" class="btn btn-primary">Get all sessions</button>
        <div v-if="sessions.length > 1">
          <button @click="closeOtherSessions" type="button" class="btn btn-primary">Close other sessions</button>
          <ul>
            <li v-for="session in sessions" :key="session">{{ session }}</li>
          </ul>
        </div>

        <div v-else>
          <p>Only current session is active. To close it use logout.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>