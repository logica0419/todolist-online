import { Ref } from "vue";
import { useStore, Task } from "./store";
import axios from "axios";

export class Api {
  store = useStore();

  setAxiosUrl() {
    axios.defaults.baseURL =
      "http://naro-todo-server-go.logica.trap.show/" + this.store.state.traQID;
  }

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
    axios.post(`/tasks`, body).then((response) => {
      this.store.dispatch("fetchTasks", response);
    });
  }

  modifyTask(name: string, date: string, state: boolean) {
    const body: Task = {
      id: name,
      name: name,
      date: date,
      ifcomp: state,
    };
    axios.put(`/tasks/` + name, body).then((response) => {
      this.store.dispatch("fetchTasks", response);
    });
  }

  deleteTask(name: string) {
    axios.delete(`/tasks/` + name).then((response) => {
      this.store.dispatch("fetchTasks", response);
    });
  }

  deleteAll() {
    axios.delete(`/tasks`).then((response) => {
      this.store.dispatch("fetchTasks", response);
    });
  }
}
