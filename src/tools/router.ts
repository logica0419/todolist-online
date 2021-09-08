import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import ToDoListOnline from "../components/ToDoList Online.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "login", component: Login },
    { path: "/app", name: "TodoList", component: ToDoListOnline },
  ],
});
