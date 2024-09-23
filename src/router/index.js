import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import PersonalView from "@/views/PersonalView.vue";
import TodoListsView from "@/views/TodoListsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/personal",
      name: "personal",
      component: PersonalView
    },
    {
      path: "/todo-lists",
      name: "todo-lists",
      component: TodoListsView
    },
  ]
});

export default router;
