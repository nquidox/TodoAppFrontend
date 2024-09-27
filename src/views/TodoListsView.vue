<script>
import axios from "axios";
import TodoList from "@/components/TodoList.vue";

export default {
  name: "TodoListsView",
  components: {TodoList},

  data(){
    return {
      showCreateForm: false,
      newList: {},
      lists: [],
    }
  },

  methods: {
    async createListReq(list){
      await axios.post(`/todo-lists`, {"title": list.title, "order": 0});
    },

    async getAllLists(){
      await axios.get(`/todo-lists`).then(response => this.lists = response.data);
    },

    async updateListReq(list){
      await axios.put(`/todo-lists/${list.id}`, {"title": list.title, "order": 0});
    },

    async deleteListReq(list){
      await axios.delete(`/todo-lists/${list.id}`);
    },

    async createList(list){
      await this.createListReq(list);
      this.lists = [] //FIX ME
      await this.getAllLists();
      this.showCreateForm = !this.showCreateForm;
      this.newList = {};
    },

    async readLists(){
      await this.getAllLists();
    },

    async updateList(list){
      await this.updateListReq(list);
    },

    async deleteList(list){
      await this.deleteListReq(list);
      this.lists = [] //FIX ME
      await this.getAllLists();
    },
  },

  beforeMount(){
    this.readLists();
  },
}
</script>

<template>
  <div class="container">
    <div class="row d-flex mt-3">
      <span class="fs-2 text-center" @click="showCreateForm = !showCreateForm">
        <img src="../assets/icons/new_todo.svg" class="hover-image m-1" alt="edit" height="40" width="40" />
        Create new todo list
      </span>
    </div>
    <div class="card mt-3" v-if="showCreateForm === true">
      <div class="card-header card-header-blue d-flex justify-content-center">
        <input class="border-black border-2"
               v-model="newList.title"
               @keyup.enter="createList(newList)"
               @keyup.esc="showCreateForm = false"
               placeholder="Enter todo list name" />

        <img src="../assets/icons/check.svg"
             class="hover-image bordered m-1"
             @click="createList(newList)"
             alt="create list" height="24" width="24" />
        <img src="../assets/icons/cancel.svg" class="hover-image m-1" @click="showCreateForm = false" alt="cancel" height="24" width="24" />
      </div>
    </div>
  </div>

  <div class="container">
  <todo-list v-for="(list, index) in lists" :key="index" :item="list"
             @update-list="updateList(list)"
             @delete-list="deleteList(list)"
  />
  </div>
</template>

<style scoped>
@import "@/assets/custom.css";
</style>