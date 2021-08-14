<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <item-list />
</template>

<script>
import ItemList from "./components/ItemList.vue";

export default {
  components: {
    ItemList,
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
