<template>
  <div v-if="task.ifcomp == ifcomp" class="item">
    <div class="name">{{ task.name }}</div>
    &nbsp;/&nbsp;
    <div class="date">Deadline: {{ task.date }}</div>
    &nbsp;
    <button
      v-if="ifcomp == true"
      @click="modifyTask(task.name, task.date, false)"
    >
      Incompleted
    </button>
    <button
      v-if="ifcomp == false"
      @click="modifyTask(task.name, task.date, true)"
    >
      Completed
    </button>
    <div v-if="ifcomp == true">
      &nbsp;
      <button @click="deleteTask(task.name)">Delete This Task</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = `http://naro-todo-server.temma.trap.show/logica`;

export default {
  name: "ListComponentOnline",
  props: {
    ifcomp: Boolean,
    task: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: ["reloadTasks"],
  methods: {
    reloadTasks() {
      this.$emit("reloadTasks");
    },
    modifyTask(name, date, state) {
      const body = {
        id: name,
        name: name,
        date: date,
        ifcomp: state,
      };
      axios.put(`/tasks/` + name, body).then(() => {
        this.reloadTasks();
      });
    },
    deleteTask(name) {
      axios.delete(`/tasks/` + name).then(() => {
        this.reloadTasks();
      });
    },
  },
};
</script>
