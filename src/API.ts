import { computed, Ref } from "vue";
import { useStore, Tasks } from "./store/store";
import axios from "axios";
axios.defaults.baseURL = `http://naro-todo-server.temma.trap.show/logica`;

export class Api {
  store = useStore();
  tasks = computed(() => this.store.state.tasks);

  reloadTasks() {
    axios.get(`/tasks`).then((response) => {
      this.store.dispatch("fetchTasks", response);
    });
  }

  addTask(newTaskName: Ref<string>, newTaskDate: Ref<string>) {
    const ifSameTask = this.tasks.value.some((task) => {
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
      const body: Tasks = {
        id: newTaskName.value,
        name: newTaskName.value,
        date: newTaskDate.value,
        ifcomp: false,
      };
      axios.post(`/tasks`, body).then(() => {
        this.reloadTasks();
      });
    }
  }

  modifyTask(name: string, date: string, state: boolean) {
    const body: Tasks = {
      id: name,
      name: name,
      date: date,
      ifcomp: state,
    };
    axios.put(`/tasks/` + name, body).then(() => {
      this.reloadTasks();
    });
  }

  deleteTask(name: string) {
    axios.delete(`/tasks/` + name).then(() => {
      this.reloadTasks();
    });
  }

  deleteAll() {
    axios.delete(`/tasks`).then(() => {
      this.reloadTasks();
    });
  }
}
