<template>
  <h3>User: {{ traQID }}</h3>
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
  <br />
  <br />
  <button @click="logout">Logout</button>
</template>

<script lang="ts">
  import { ref, defineComponent, computed } from "vue";
  import { useStore } from "../tools/store";
  import ListContentOnline from "./ListContent Online.vue";
  import { Api } from "../tools/API";
  import { Auth } from "../tools/Auth";

  export default defineComponent({
    name: "TodoListOnline",
    components: { ListContentOnline },
    setup() {
      const auth = new Auth();
      auth.checkOnApp();

      const store = useStore();
      const tasks = computed(() => store.state.tasks);
      const traQID = computed(() => store.state.traQID);

      const newTaskName = ref("");
      const newTaskDate = ref("2021-01-01");

      const api = new Api();
      api.reloadTasks();

      const addTask = () => {
        const ifSameTask = tasks.value.some((task) => {
          if (task.name == newTaskName.value) {
            alert("同じ名前のタスクがあります。タスクが追加できません");
            return true;
          }
        });
        const ifBlankName = () => {
          if (newTaskName.value == "") {
            alert("タスク名が無いため、タスクを追加できません");
            return true;
          }
          return false;
        };

        if (!ifSameTask && !ifBlankName()) {
          api.addTask(newTaskName, newTaskDate);
        }
      };

      const deleteAll = () => {
        api.deleteAll();
      };

      const logout = () => {
        auth.logout();
      };

      return {
        tasks,
        traQID,
        newTaskName,
        newTaskDate,
        addTask,
        deleteAll,
        logout,
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
