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

<script lang="ts">
  import { defineComponent } from "@vue/runtime-core";
  import { Api } from "../tools/API";

  export default defineComponent({
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
    setup() {
      const api = new Api();

      const modifyTask = (name: string, date: string, state: boolean) => {
        api.modifyTask(name, date, state);
      };
      const deleteTask = (name: string) => {
        api.deleteTask(name);
      };

      return { modifyTask, deleteTask };
    },
  });
</script>
