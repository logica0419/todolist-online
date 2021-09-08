import { useRouter } from "vue-router";
import { Api } from "./API";
import { useStore } from "./store";

export class Auth {
  router = useRouter();
  store = useStore();
  api = new Api();

  checkOnApp() {
    if (this.store.state.traQID == "") {
      this.router.push("/");
    }
    this.api.setAxiosUrl();
  }

  checkOnLogin() {
    if (this.store.state.traQID != "") {
      this.api.setAxiosUrl();
      this.router.push("/app");
    }
  }

  login(traQID: string) {
    if (traQID == "") {
      alert("空のtraQIDは無効です");
      return;
    }

    this.store.commit("setTraQID", traQID);
    this.api.setAxiosUrl();
    this.router.push("/app");
  }

  logout() {
    this.store.commit("resetTraQID");
    this.api.setAxiosUrl();
    this.router.push("/");
  }
}
