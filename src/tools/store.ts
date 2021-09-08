import { AxiosResponse } from "axios";
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
  traQID: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    tasks: [],
    traQID: "",
  },
  mutations: {
    fetchTasks(state: State, response: AxiosResponse) {
      state.tasks = response.data;
    },
    setTraQID(state: State, value: string) {
      state.traQID = value;
    },
    resetTraQID(state: State) {
      state.traQID = "";
    },
  },
  actions: {
    fetchTasks(context, response: AxiosResponse) {
      context.commit("fetchTasks", response);
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
