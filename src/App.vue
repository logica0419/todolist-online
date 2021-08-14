<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <to-do-list />
</template>

<script>
import ToDoList from "./components/ToDoList.vue";

export default {
  components: {
    ToDoList,
  },
};
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
