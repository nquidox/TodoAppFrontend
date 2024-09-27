<script>
import DoneSwitcher from "@/components/doneSwitcher.vue";
import EditDelete from "@/components/editDelete.vue";
import OkCancel from "@/components/okCancel.vue";

export default {
  name: "TodoTask" ,
  components: {OkCancel, EditDelete, DoneSwitcher},

  props: {
    item: {
      type: Object,
      required: true,
    },

    isEdit: {
      type: Boolean,
      required: true,
    }
  },

  methods: {
    editTask(){
      this.$emit("edit-task", this.item.id);
    },
    saveTask(){
      this.$emit("save-task", this.item.id);
    },
    deleteTask(){
      this.$emit("delete-task", this.item.id);
    },
    taskEditSwitcher(){
      this.$emit("edit-switcher", this.item.id);
    },
    doneSwitch(){
      this.$emit("done-switcher", this.item.id);
    },
  },
}
</script>

<template>
  <div class="d-flex justify-content-between">
    <div class="fs-6" v-if="!isEdit">
      <done-switcher :item="item" @switch-state="doneSwitch()" />
      <span class="fs-6" @click="editTask()">{{ item.title }}</span>
    </div>
    <div v-else>
      <img src="../assets/icons/circle.svg" class="m-1 svg-icon-disabled" alt="*" />
      <input class="border-black border-2"
             v-model="item.title"
             @keyup.enter="saveTask()"
             @keyup.esc="taskEditSwitcher()"
             placeholder="Task title" />
      <ok-cancel :item="item" :isEdit="isEdit" @ok-action="saveTask()" @cancel-action="taskEditSwitcher()" />
    </div>
    <div>
      <edit-delete :item="item" @edit-entity="editTask()" @delete-entity="deleteTask()" />
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/custom.css";
</style>