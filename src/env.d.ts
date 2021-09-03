/// <reference types="vite/client" />

import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { State } from "./store/store";

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@vue/runtime-core" {
  // `this.$store` の型付けを提供する
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
