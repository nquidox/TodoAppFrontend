<script>
export default {
  name: "editDelete",

  props: {
    item: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
      default: false,
    }
  },

  methods: {
    editEntity(){
      this.$emit("edit-entity", this.item.id);
    },

    deleteEntity() {
      this.$emit("delete-entity", this.item.id);
    },

    show(){
      this.visible = true;
    },
    hide(){
      this.visible = false;
    },
  },
}
</script>

<template>
  <div v-if="visible">
    <img src="../assets/icons/edit.svg" class="svg-icon mx-1" @click="editEntity()" alt="edit" />
    <img src="../assets/icons/trash.svg" class="svg-icon mx-1" @click="deleteEntity()" alt="delete" />
  </div>
</template>

<style scoped>
@import "@/assets/custom.css";
</style>