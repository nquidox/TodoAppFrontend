<script>
import axios from "axios";

export default {
  name: "TodoListsView",

  data(){
    return {
      showCreateForm: false,
      newList: {
        title: "new title",
        order: 0,
      },
      newTask: {
        title: "new task",
      },

      lists: [],
      tasks:[],
    }
  },

  methods: {
    createListReq(list){
      axios.post(`/todo-lists`, {"title": list.title, "order": 0});
    },

    getAllLists(){
      axios.get(`/todo-lists`).then(response => {
        this.lists = response.data;
        this.lists.forEach(list => {this.getListTasksReq(list.id);});
      });
    },

    updateListReq(list){
      axios.put(`/todo-lists/${list.id}`, {"title": list.title, "order": 0});
    },

    deleteListReq(listId){
      axios.delete(`/todo-lists/${listId}`);
    },

    getListTasksReq(id){
      axios.get(`/todo-lists/${id}/tasks`).then(response => this.tasks.push({id: id, data: response.data}))
    },

    createList(list){
      this.lists.unshift(list);
      this.showCreateForm = !this.showCreateForm;
      this.createListReq(list);
    },

    editList(list){
      list.isEdit = true;
      list.newTitle = list.title;
    },

    saveList(list){
      list.isEdit = false;
      list.title = list.newTitle;
      this.updateListReq(list);
    },

    deleteList(listId){
      const index = this.lists.findIndex(list => list.id === listId);
      if (index > -1) {
        this.lists.splice(index, 1);
      }
      this.deleteListReq(listId);
    },

    getTasksByListId(listId) {
      const listTasks = this.tasks.find(task => task.id === listId);
      return listTasks ? listTasks.data : [];
    },
  },

  beforeMount(){
    this.getAllLists();
  },
}
</script>

<template>
  <div class="container text-center">
    <div class="row mt-3">
      <span class="fs-2" @click="showCreateForm = !showCreateForm">
        <img src="../assets/icons/new_todo.svg" class="hover-image m-1" alt="edit" height="40" width="40" />
        Create new todo list
      </span>
    </div>

    <div class="card mt-3" v-if="showCreateForm === true">
      <div class="card-header card-header-blue d-flex justify-content-center">
        <input class="border-black border-2" v-model="newList.title" placeholder="Enter todo list name" />
        <img src="../assets/icons/check.svg" class="hover-image bordered m-1" @click="createList(newList)" alt="create list" height="24" width="24" />
        <img src="../assets/icons/cancel.svg" class="hover-image m-1" @click="showCreateForm = false" alt="cancel" height="24" width="24" />
      </div>
    </div>
  </div>

  <div class="container">
    <div class="card mt-3" v-for="list in lists" :key="list.id">
      <div class="card-header card-header-green d-flex justify-content-between">
        <div v-if="!list.isEdit">
          <span>{{ list.title }}</span>
        </div>
        <div v-else>
          <input class="border-black border-2" v-model="list.newTitle" placeholder="list.title" />
          <img src="../assets/icons/check.svg" class="hover-image bordered m-1" @click="saveList(list)" alt="save" height="24" width="24" />
        </div>
        <div>
          <img src="../assets/icons/edit.svg" class="hover-image m-1" @click="editList(list)" alt="edit" height="24" width="24" />
          <img src="../assets/icons/trash.svg" class="hover-image m-1" @click="deleteList(list.id)" alt="delete" height="24" width="24" />
        </div>

      </div>
      <ol class="list-group list-group-flush">
        <li class="list-group-item" v-for="task in getTasksByListId(list.id)" :key="task.id">
          <span class="fs-6">
            <img src="../assets/icons/circle.svg" class="m-1" alt="*" height="24" width="24" />
            {{ task.title }}
          </span>
        </li>
        <li class="list-group-item">
            <span class="fs-6">
              <img src="../assets/icons/plus.svg" class="hover-image m-1" @click="" alt="add task" height="24" width="24" />
              Add task
            </span>
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

.card-header-blue{
  background-color: #34aaff;
}

.card-header-green{
  background-color: aquamarine;
}

.hover-image{
  transition: 0.3s;
}

.hover-image:hover{
  transform: scale(1.1);
}
</style>