<template>
  <h1>ToDo-List</h1>
  <h2>Completed</h2>
  <div v-for="task in tasks" :key="task.name">
    <div v-if="task.ifcomp == true" class="item">
      <div class="name">{{ task.name }}</div>
      &nbsp;/&nbsp;
      <div class="date">Deadline: {{ task.date }}</div>
      &nbsp;
      <button @click="modifyState(task.name, false)">Incompleted</button>
      &nbsp;
      <button @click="deleteTask(task.name)">Delete This Task</button>
    </div>
  </div>
  <h2>Incompleted</h2>
  <div v-for="task in tasks" :key="task.name">
    <div v-if="task.ifcomp == false" class="item">
      <div class="name">{{ task.name }}</div>
      &nbsp;/&nbsp;
      <div class="date">Deadline: {{ task.date }}</div>
      &nbsp;
      <button @click="modifyState(task.name, true)">Completed</button>
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

export default {
  name: "ItemList",
  setup() {
    const tasks = ref([]);
    if (localStorage.getItem("todos"))
      tasks.value = JSON.parse(localStorage.getItem("todos"));
    const saveData = () => {
      localStorage.setItem("todos", JSON.stringify(tasks.value));
    };

    const newTaskName = ref("");
    const newTaskDate = ref("2021-01-01");

    const addTask = () => {
      const ifSameTask = tasks.value.some((task) => {
        if (task.name == newTaskName.value) {
          alert("同じ名前のタスクがあります。タスクが追加できません。");
          return true;
        }
      });
      var ifBlankName = false;
      if (newTaskName.value == "") {
        alert("タスク名が無いため、タスクを追加できません");
        ifBlankName = true;
      }
      if (!ifSameTask && !ifBlankName) {
        tasks.value.push({
          name: newTaskName.value,
          date: newTaskDate.value,
          ifcomp: false,
        });
        saveData();
      }
    };

    const modifyState = (name, state) => {
      tasks.value.some((task, id) => {
        if (task.name == name) tasks.value[id].ifcomp = state;
      });
      saveData();
    };

    const deleteTask = (name) => {
      tasks.value.some(function (task, id) {
        if (task.name == name) tasks.value.splice(id, 1);
      });
      saveData();
    };

    const deleteAll = () => {
      tasks.value = [];
      saveData();
    };

    return {
      tasks,
      newTaskName,
      newTaskDate,
      addTask,
      modifyState,
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
