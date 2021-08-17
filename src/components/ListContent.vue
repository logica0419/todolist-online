<template>
  <div v-if="task.ifcomp == ifcomp" class="item">
    <div class="name">{{ task.name }}</div>
    &nbsp;/&nbsp;
    <div class="date">Deadline: {{ task.date }}</div>
    &nbsp;
    <button v-if="ifcomp == true" @click="modifyState(task.name, false)">
      Incompleted
    </button>
    <button v-if="ifcomp == false" @click="modifyState(task.name, true)">
      Completed
    </button>
    <div v-if="ifcomp == true">
      &nbsp;
      <button @click="deleteTask(task.name)">Delete This Task</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListComponent",
  props: {
    ifcomp: Boolean,
    task: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: ["modifyState", "deleteTask"],
  methods: {
    modifyState(taskName, state) {
      this.$emit("modifyState", taskName, state);
    },
    deleteTask(taskName) {
      this.$emit("deleteTask", taskName);
    },
  },
};
</script>
