<script>
import axios from "axios";

export default {
  name: "TodoList",

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

    async createTaskReq(listId, task){
      await axios.post(`/todo-lists/${listId}/tasks`, {"title": task.title});
    },

    async getTasksReq(listId){
      await axios.get(`/todo-lists/${listId}/tasks`).then(response => this.tasks = response.data);
    },

    async updateTaskReq(listId, task){
      await axios.put(`/todo-lists/${listId}/tasks/${task.id}`, {"title": task.title});
    },

    async deleteTaskReq(listId, task){
      await axios.delete(`/todo-lists/${listId}/tasks/${task.id}`);
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

  },

  created() {
    this.getTasks()
  },
}
</script>

<template>
  <div class="container">
    <div class="card mt-3">
      <div class="card-header card-header-green d-flex justify-content-between">
        <div v-if="!list.isEdit">
          <span class="fs-6" @click="editList(list)"> {{ list.title }} </span>
        </div>
        <div v-else>
          <input class="border-black border-2"
                 v-model="list.newTitle"
                 @keyup.enter="saveList(list)"
                 @keyup.esc="list.isEdit = !list.isEdit"
                 placeholder="list.title" />
          <img src="../assets/icons/check.svg" class="hover-image bordered m-1" @click="saveList(list)" alt="save" height="24" width="24" />
          <img src="../assets/icons/cancel.svg" class="hover-image m-1" @click="list.isEdit = !list.isEdit" alt="cancel" height="24" width="24" />
        </div>
        <div>
          <img src="../assets/icons/edit.svg" class="hover-image m-1" @click="editList(list)" alt="edit" height="24" width="24" />
          <img src="../assets/icons/trash.svg" class="hover-image m-1" @click="deleteList(list)" alt="delete" height="24" width="24" />
        </div>

      </div>
      <ol class="list-group list-group-flush">
        <li class="list-group-item" v-for="task in tasks" :key="task">
          <div class="d-flex justify-content-between">

            <div class="fs-6" v-if="!task.isEdit">
              <img src="../assets/icons/circle.svg" class="m-1" alt="*" height="24" width="24" />
              <span class="fs-6" @click="editTask(task)">{{ task.title }}</span>
            </div>

            <div v-else>
              <img src="../assets/icons/circle.svg" class="m-1" alt="*" height="24" width="24" />
              <input class="border-black border-2"
                     v-model="task.title"
                     @keyup.enter="saveTask(task)"
                     @keyup.esc="task.isEdit = !task.isEdit"
                     placeholder="Task title" />
              <img src="../assets/icons/check.svg" class="hover-image bordered m-1" @click="saveTask(task)" alt="save" height="24" width="24" />
              <img src="../assets/icons/cancel.svg" class="hover-image m-1" @click="task.isEdit = !task.isEdit" alt="cancel" height="24" width="24" />
            </div>

            <div>
              <img src="../assets/icons/edit.svg" class="hover-image m-1" @click="editTask(task)" alt="edit" height="24" width="24" />
              <img src="../assets/icons/trash.svg" class="hover-image m-1" @click="deleteTask(task)" alt="delete" height="24" width="24" />
            </div>

          </div>
        </li>

        <li class="list-group-item">
          <div v-if="!taskEdit">
            <span class="fs-6" @click="taskEdit = !taskEdit">
              <img src="../assets/icons/plus.svg" class="hover-image m-1" alt="add task" height="24" width="24" />
              Add task
            </span>
          </div>
          <div v-else>
            <input class="border-black border-2" v-model="task.title" @keyup.enter="createTask(task)" placeholder="New task" />
            <img src="../assets/icons/check.svg" class="hover-image bordered m-1" @click="createTask(task)" alt="create" height="24" width="24" />
            <img src="../assets/icons/cancel.svg" class="hover-image m-1" @click="taskEdit = !taskEdit" alt="cancel" height="24" width="24" />
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.bordered{
  border: 2px solid;
  border-radius: 5px;
}

.card-header-green{
  background-color: aquamarine;
}

.hover-image{
  transition: 0.3s;
}

.hover-image:hover {
  transform: scale(1.1);
}
</style>