<script>
import { RouterLink, RouterView } from 'vue-router'
import {defineComponent} from "vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  components: {Navbar}
})

</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style>
</style>
