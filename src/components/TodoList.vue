<script>
import axios from "axios";
import EditDelete from "@/components/editDelete.vue";
import OkCancel from "@/components/okCancel.vue";
import DoneSwitcher from "@/components/doneSwitcher.vue";
import ListTitle from "@/components/listTitle.vue";
import TodoTask from "@/components/TodoTask.vue";
import CreateTask from "@/components/createTask.vue";
import ShrinkExpand from "@/components/shrinkExpand.vue";

export default {
  name: "TodoList",
  components: {ShrinkExpand, CreateTask, TodoTask, ListTitle, DoneSwitcher, OkCancel, EditDelete},

  props: {
    item: {
      type: Object,
      required: true,
    }
  },

  data(){
    return {
      taskEdit: false,

      list: this.item,

      task:{},
      tasks: [],

      isEditDeleteVisible: false,
    }
  },

  methods: {
    updateList(){
      this.$emit('update-list', this.item.id);
    },

    deleteList() {
      this.$emit('delete-list', this.item.id);
    },

    editList(list){
      list.isEdit = true;
      list.newTitle = list.title;
    },

    saveList(list){
      list.isEdit = false;
      list.title = list.newTitle;
      this.updateList();
    },

    listEditSwitcher(list){
      list.isEdit = !list.isEdit
    },

    async createTaskReq(listId, task){
      await axios.post(`/todo-lists/${listId}/tasks`, {"title": task.title},{
        headers: {"Content-Type": "application/json"}
      });
    },

    async getTasksReq(listId){
      await axios.get(`/todo-lists/${listId}/tasks`, {
        headers: {"Content-Type": "application/json"}
      })
          .then(response => this.tasks = response.data);
    },

    async updateTaskReq(listId, task){
      await axios.put(`/todo-lists/${listId}/tasks/${task.id}`, {...task}, {
        headers: {"Content-Type": "application/json"}
      });
    },

    async deleteTaskReq(listId, task){
      await axios.delete(`/todo-lists/${listId}/tasks/${task.id}`, {
        headers: {"Content-Type": "application/json"}
      });
    },

    async createTask(task){
      await this.createTaskReq(this.list.id, task);
      await this.getTasksReq(this.list.id);
      this.taskEdit = false;
      this.task = {};
    },

    async getTasks(){
      await this.getTasksReq(this.list.id);
    },

    async updateTask(task){
      await this.updateTaskReq(this.list.id, task);
    },

    async deleteTask(task){
      await this.deleteTaskReq(this.list.id, task);
      await this.getTasksReq(this.list.id);
      this.task = {}
    },

    editTask(task){
      task.isEdit = true;
    },
    saveTask(task){
      this.updateTask(task)
      task.isEdit = false;
    },

    taskEditSwitcher(task){
      task.isEdit = !task.isEdit
    },

    doneSwitch(task){
      if (task.status === 0){
        task.status = 1;
      } else if (task.status === 1){
        task.status = 0;
      }
      this.updateTask(task);
    },

    toggleEdit(){
      this.taskEdit = !this.taskEdit
    },

    showEditDelete() {
      this.isEditDeleteVisible = true
    },

    hideEditDelete() {
      this.isEditDeleteVisible = false
    },

    expander(entity){
      entity.expanded = !entity.expanded;
    },
  },

  created() {
    this.getTasks();
  },
}
</script>

<template>
  <div class="container">
    <div class="card mt-3">
      <div class="card-header card-header-green d-flex justify-content-between"
           @mouseenter="showEditDelete"
           @mouseleave="hideEditDelete">
        <div class="d-flex align-items-center">
          <list-title :item="list" :isEdit="list.isEdit"
                      @edit-title="editList(list)"
                      @save-title="saveList(list)"
                      @cancel-edit="listEditSwitcher(list)" />

          <edit-delete :item="list"
                       :visible="isEditDeleteVisible"
                       @edit-entity="editList(list)"
                       @delete-entity="deleteList(list)"
                       class="m-2" />
        </div>
        <div>
          <shrink-expand :item="list"
                         :expanded="list.expanded"
                         @expandSwitcher="expander(list)"
          />
        </div>
      </div>

      <ol class="list-group list-group-flush">
        <li class="list-group-item" v-for="task in tasks" :key="task">
          <TodoTask :item="task" :isEdit="task.isEdit"
                    @edit-task="editTask(task)"
                    @save-task="saveTask(task)"
                    @delete-task="deleteTask(task)"
                    @edit-switcher="taskEditSwitcher(task)"
                    @done-switcher="doneSwitch(task)" />
        </li>
        <li class="list-group-item">
          <create-task :item="task" :isEdit="taskEdit"
                       @create-task="createTask(task)"
                       @toggle-edit="toggleEdit"
          />
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/custom.css";
</style>