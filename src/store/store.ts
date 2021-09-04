import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export interface Task {
  id: string;
  name: string;
  date: string;
  ifcomp: boolean;
}

export interface State {
  tasks: Task[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    tasks: [],
  },
  mutations: {
    fetchTasks(state, response) {
      state.tasks = response.data;
    },
  },
  actions: {
    fetchTasks(context, response) {
      context.commit("fetchTasks", response);
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
