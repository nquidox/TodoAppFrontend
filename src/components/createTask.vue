<script>
import OkCancel from "@/components/okCancel.vue";

export default {
  name: "createTask" ,
  components: {OkCancel},

  props:{
    item: {
      type: Object,
      required: true
    },

    isEdit: {
      type: Boolean,
      default: false,
    },
  },

  methods:{
    createTask(){
      this.$emit("create-task", this.item.id);
    },

    editSwitcher(){
      this.$emit("toggle-edit");
    },
  },
}
</script>

<template>
  <div v-if="!isEdit">
    <img src="../assets/icons/plus.svg" class="m-1 svg-icon" alt="add task" @click="editSwitcher()" />
    <span class="m-1">|</span>
    <span class="fs-6" @click="editSwitcher()">Add task</span>
  </div>
  <div v-else>
    <input class="border-black border-2" v-model="item.title" @keyup.enter="createTask()" placeholder="New task" />
    <ok-cancel :item="item" :isEdit="isEdit" @ok-action="createTask()" @cancel-action="editSwitcher()" />
  </div>
</template>

<style scoped>
@import "@/assets/custom.css";
</style>