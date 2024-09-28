<script>
export default {
  name: "shrinkExpand",

  props: {
    item: {
      type: Object,
      required: true
    },
    expanded: {
      type: Boolean,
      required: true,
    }
  },

  methods: {
    expandSwitcher(){
      this.$emit("expand-switcher", this.item.id);
    },
  },
}
</script>

<template>
  <div v-if="!expanded">
    <img src="@/assets/icons/double-down.svg" class="svg-icon mx-1" @click="expandSwitcher" alt="expand" />
  </div>
  <div v-else>
    <img src="@/assets/icons/double-up.svg" class="svg-icon mx-1" @click="expandSwitcher" alt="shrink" />
  </div>
</template>

<style scoped>
@import "@/assets/custom.css";
</style>