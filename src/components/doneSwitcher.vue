<script>
export default {
  name: "doneSwitcher",

  props: {
    item: {
      type: Object,
      required: true,
    }
  },

  methods: {
    switchState(){
      this.$emit("switch-state", this.item.status);
    },
  },
}
</script>

<template>
  <img src="../assets/icons/circle.svg" v-if="item.status === 0" @click="switchState()" class="m-1 svg-icon" alt="*" />
  <img src="../assets/icons/check-circle.svg" v-if="item.status === 1" @click="switchState()" class="m-1 svg-icon" alt="*" />
</template>

<style scoped>
@import "@/assets/custom.css";
</style>