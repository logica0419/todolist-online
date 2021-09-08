import { Ref } from "vue";
import { useStore, Task } from "./store/store";
import axios from "axios";

const store = useStore();
axios.defaults.baseURL =
  "http://naro-todo-server-go.logica.trap.show/" + store.state.traQID;

export class Api {
  reloadTasks() {
    axios.get(`/tasks`).then((response) => {
      store.dispatch("fetchTasks", response);
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
      store.dispatch("fetchTasks", response);
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
      store.dispatch("fetchTasks", response);
    });
  }

  deleteTask(name: string) {
    axios.delete(`/tasks/` + name).then((response) => {
      store.dispatch("fetchTasks", response);
    });
  }

  deleteAll() {
    axios.delete(`/tasks`).then((response) => {
      store.dispatch("fetchTasks", response);
    });
  }
}
