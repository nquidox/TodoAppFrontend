<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Navbar",

  computed:{
    ...mapGetters(["isAuth"]),
  },

  methods:{
    ...mapActions(["logout"]),

    async handleLogout() {
      try {
        await this.logout();
        this.$router.push("/");
      }
      catch (error) {
        console.error(error);
      }
    },
  },
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">Todo App</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link active">Home</router-link>
          </li>
        </ul>

          <div v-if="!isAuth">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/login" class="nav-link active">Login</router-link>
            </li>
            </ul>
          </div>

          <div v-if="isAuth">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/personal" class="nav-link active">Personal</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/logout" class="nav-link active" @click.prevent="handleLogout">Logout</router-link>
            </li>
            </ul>
          </div>
      </div>
    </div>
  </nav>
</template>
