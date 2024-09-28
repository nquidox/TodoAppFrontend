<script>
import {defineComponent} from "vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  components: {Navbar}
})

</script>

<template>
  <Navbar />
  <RouterView style="padding-top: 60px"/>
</template>

<style>

</style>
