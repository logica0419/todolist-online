<template>
  <h1>ToDo-List</h1>
  <h2>Completed</h2>
  <div v-for="task in tasks" :key="task.name">
    <div v-if="task.ifcomp == true" class="item">
      <div class="name>">{{ task.name }}</div>
      &nbsp;/&nbsp;
      <div class="date">〆切: {{ task.date }}</div>
      &nbsp;
      <button @click="task.ifcomp = false">未完にする</button>
      &nbsp;
      <button @click="deleteTask(task.name)">タスクを削除する</button>
    </div>
  </div>
  <h2>Incompleted</h2>
  <div v-for="task in tasks" :key="task.name">
    <div v-if="task.ifcomp == false" class="item">
      <div class="name>">{{ task.name }}</div>
      &nbsp;/&nbsp;
      <div class="date">〆切: {{ task.date }}</div>
      &nbsp;
      <button @click="task.ifcomp = true">完了にする</button>
    </div>
  </div>
  <br />
  <div class="input">
    <label for="name">タスク</label>
    <input id="name" v-model="newTaskName" type="text" />
    &nbsp;
    <label for="date">〆切</label>
    <input id="date" v-model="newTaskDate" type="date" />
    &nbsp;
    <button @click="addTask">Add to List</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ItemList",
  setup() {
    const tasks = ref([]);

    const newTaskName = ref("");
    const newTaskDate = ref("2021/01/01");

    const addTask = () => {
      const ifSameTask = tasks.value.some((task) => {
        if (task.name == newTaskName.value) {
          alert("同じ名前のタスクがあります。タスクが追加できません。");
          return true;
        }
      });
      if (ifSameTask == false) {
        tasks.value.push({
          name: newTaskName.value,
          date: newTaskDate.value,
          ifcomp: false,
        });
      }
    };

    const deleteTask = (name) => {
      tasks.value.some(function (task, id) {
        if (task.name == name) tasks.value.splice(id, 1);
      });
    };

    return { tasks, newTaskName, newTaskDate, addTask, deleteTask };
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
