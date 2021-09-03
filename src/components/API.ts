import { Ref } from "vue";
import axios from "axios";
axios.defaults.baseURL = `http://naro-todo-server.temma.trap.show/logica`;

export interface Tasks {
  id: string;
  name: string;
  date: string;
  ifcomp: boolean;
}

export class Api {
  reloadTasks(tasks: Ref<Tasks[]>) {
    axios.get(`/tasks`).then((response) => {
      tasks.value = response.data;
    });
  }

  addTask(
    tasks: Ref<Tasks[]>,
    newTaskName: Ref<string>,
    newTaskDate: Ref<string>
  ) {
    const ifSameTask = tasks.value.some((task) => {
      if (task.name == newTaskName.value) {
        alert("同じ名前のタスクがあります。タスクが追加できません");
        return;
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
          this.reloadTasks(tasks);
        });
    }
  }

  modifyTask(tasks: Ref<Tasks[]>, name: string, date: string, state: boolean) {
    const body: Tasks = {
      id: name,
      name: name,
      date: date,
      ifcomp: state,
    };
    axios.put(`/tasks/` + name, body).then(() => {
      this.reloadTasks(tasks);
    });
  }

  deleteTask(tasks: Ref<Tasks[]>, name: string) {
    axios.delete(`/tasks/` + name).then(() => {
      this.reloadTasks(tasks);
    });
  }

  deleteAll(tasks: Ref<Tasks[]>) {
    axios.delete(`/tasks`).then(() => {
      this.reloadTasks(tasks);
    });
  }
}
