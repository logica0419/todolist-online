<template>
  <h1>ToDo-List (Online)</h1>
  <h2>Incompleted</h2>
  <div v-for="task in tasks" :key="task.name">
    <list-content-online :ifcomp="false" :task="task" />
  </div>
  <h2>Completed</h2>
  <div v-for="task in tasks" :key="task.name">
    <list-content-online :ifcomp="true" :task="task" />
  </div>
  <br />
  <div class="input">
    <label for="name">Task </label>
    <input id="name" v-model="newTaskName" type="text" />
    &nbsp;
    <label for="date">Deadline </label>
    <input id="date" v-model="newTaskDate" type="date" />
    &nbsp;
    <button @click="addTask">Add to List</button>
  </div>
  <br />
  <button @click="deleteAll">Delete All tasks</button>
</template>

<script lang="ts">
  import { ref, Ref, defineComponent } from "vue";
  import ListContentOnline from "./ListContent Online.vue";
  import { Tasks, Api } from "./API";

  export default defineComponent({
    name: "TodoListOnline",
    components: { ListContentOnline },
    setup() {
      const tasks: Ref<Tasks[]> = ref([]);
      const newTaskName = ref("");
      const newTaskDate = ref("2021-01-01");

      const api = new Api();

      api.reloadTasks(tasks);

      const addTask = () => {
        api.addTask(tasks, newTaskName, newTaskDate);
      };

      const deleteAll = () => {
        api.deleteAll(tasks);
      };

      return {
        tasks,
        newTaskName,
        newTaskDate,
        addTask,
        deleteAll,
      };
    },
  });
</script>

<style>
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
