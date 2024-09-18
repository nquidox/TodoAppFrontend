<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "HomeView",

  data() {
    return {
      email: '',
      password: '',
    };
  },

  computed:{
    ...mapGetters(["isAuth", "user"]),
  },

  methods:{
    ...mapActions(["login", "logout"]),
  },
}

</script>

<template>
  <div class="container">
    <div v-if="isAuth">
      <p>Добро пожаловать, {{ user }}!</p>
    </div>

    <div v-else>
      <p>Залогиньтесь.</p>
    </div>
  </div>
</template>

<style scoped>

</style>