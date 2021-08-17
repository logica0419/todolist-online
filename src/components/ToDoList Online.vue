<template>
  <h1>ToDo-List (Online)</h1>
  <h2>Incompleted</h2>
  <div v-for="task in tasks" :key="task.name">
    <list-content-online
      :ifcomp="false"
      :task="task"
      @reloadTasks="reloadTasks"
    />
  </div>
  <h2>Completed</h2>
  <div v-for="task in tasks" :key="task.name">
    <list-content-online
      :ifcomp="true"
      :task="task"
      @reloadTasks="reloadTasks"
    />
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

<script>
import { ref } from "vue";
import axios from "axios";
axios.defaults.baseURL = `http://naro-todo-server.temma.trap.show/logica`;
import ListContentOnline from "./ListContent Online.vue";

export default {
  name: "TodoListOnline",
  components: { ListContentOnline },
  setup() {
    const tasks = ref([]);
    const newTaskName = ref("");
    const newTaskDate = ref("2021-01-01");

    const reloadTasks = () => {
      axios.get(`/tasks`).then((response) => {
        tasks.value = response.data;
      });
    };

    reloadTasks();

    const addTask = () => {
      const ifSameTask = tasks.value.some((task) => {
        if (task.name == newTaskName.value) {
          alert("同じ名前のタスクがあります。タスクが追加できません");
          return true;
        }
      });
      var ifBlankName = false;
      if (newTaskName.value == "") {
        alert("タスク名が無いため、タスクを追加できません");
        ifBlankName = true;
      }
      if (!ifSameTask && !ifBlankName) {
        axios
          .post(`/tasks`, {
            id: newTaskName.value,
            name: newTaskName.value,
            date: newTaskDate.value,
            ifcomp: false,
          })
          .then(() => {
            reloadTasks();
          });
      }
    };

    const deleteAll = () => {
      axios.delete(`/tasks`).then(() => {
        reloadTasks();
      });
    };

    return {
      tasks,
      newTaskName,
      newTaskDate,
      reloadTasks,
      addTask,
      deleteAll,
    };
  },
};
</script>

<style>
.item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
