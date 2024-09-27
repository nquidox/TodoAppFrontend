<script>
export default {
  name: "editDelete",

  props: {
    item: {
      type: Object,
      required: true,
    }
  },

  methods: {
    editEntity(){
      this.$emit("edit-entity", this.item.id);
    },

    deleteEntity() {
      this.$emit("delete-entity", this.item.id);
    },
  },
}
</script>

<template>
  <img src="../assets/icons/edit.svg" class="svg-icon m-1" @click="editEntity()" alt="edit" />
  <img src="../assets/icons/trash.svg" class="svg-icon m-1" @click="deleteEntity()" alt="delete" />
</template>

<style scoped>
@import "@/assets/custom.css";
</style>