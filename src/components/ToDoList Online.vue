<template>
  <h1>ToDo-List</h1>
  <h2>Incompleted</h2>
  <div v-for="task in tasks" :key="task.name">
    <div v-if="task.ifcomp == false" class="item">
      <div class="name">{{ task.name }}</div>
      &nbsp;/&nbsp;
      <div class="date">Deadline: {{ task.date }}</div>
      &nbsp;
      <button @click="modifyTask(task.name, task.date, true)">Completed</button>
    </div>
  </div>
  <h2>Completed</h2>
  <div v-for="task in tasks" :key="task.name">
    <div v-if="task.ifcomp == true" class="item">
      <div class="name">{{ task.name }}</div>
      &nbsp;/&nbsp;
      <div class="date">Deadline: {{ task.date }}</div>
      &nbsp;
      <button @click="modifyTask(task.name, task.date, false)">
        Incompleted
      </button>
      &nbsp;
      <button @click="deleteTask(task.name)">Delete This Task</button>
    </div>
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

export default {
  name: "ItemList",
  setup() {
    axios.defaults.baseURL = `http://naro-todo-server.temma.trap.show/logica`;

    const tasks = ref([]);
    const reloadTasks = () => {
      axios.get(`/tasks`).then((response) => {
        tasks.value = response.data;
      });
    };
    reloadTasks();

    const newTaskName = ref("");
    const newTaskDate = ref("2021-01-01");

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

    const modifyTask = (name, date, state) => {
      const body = {
        id: name,
        name: name,
        date: date,
        ifcomp: state,
      };
      axios.put(`/tasks/` + name, body).then(() => {
        reloadTasks();
      });
    };

    const deleteTask = (name) => {
      axios.delete(`/tasks/` + name).then(() => {
        reloadTasks();
      });
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
      addTask,
      modifyTask,
      deleteTask,
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
