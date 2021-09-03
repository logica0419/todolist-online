<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <to-do-list-online></to-do-list-online>
</template>

<script lang="ts">
  import { defineComponent } from "@vue/runtime-core";
  import ToDoListOnline from "./components/ToDoList Online.vue";

  export default defineComponent({
    name: "App",
    components: { ToDoListOnline },
  });
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
