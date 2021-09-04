import { Ref } from "vue";
import { useStore, Task } from "./store/store";
import axios from "axios";
axios.defaults.baseURL = `http://naro-todo-server.temma.trap.show/logica`;

export class Api {
  store = useStore();

  reloadTasks() {
    axios.get(`/tasks`).then((response) => {
      this.store.dispatch("fetchTasks", response);
    });
  }

  addTask(newTaskName: Ref<string>, newTaskDate: Ref<string>) {
    const body: Task = {
      id: newTaskName.value,
      name: newTaskName.value,
      date: newTaskDate.value,
      ifcomp: false,
    };
    axios.post(`/tasks`, body).then(() => {
      this.reloadTasks();
    });
  }

  modifyTask(name: string, date: string, state: boolean) {
    const body: Task = {
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
