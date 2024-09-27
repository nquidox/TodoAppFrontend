<script>
export default {
  name: "okCancel",

  props: {
    item: {
      type: Object,
      required: true,
    },

    isEdit: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    ok(){
      this.$emit("ok-action", this.item.id);
    },

    cancel() {
      this.$emit("cancel-action", this.item.id);
    },
  },
}
</script>

<template>
  <img src="../assets/icons/check.svg" class="svg-icon m-1 bordered" @click="ok()" alt="save" />
  <img src="../assets/icons/cancel.svg" class="svg-icon m-1 " @click="cancel()" alt="cancel" />
</template>

<style scoped>
@import "@/assets/custom.css";
</style>