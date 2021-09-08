<template>
  <h2>Please Enter Your traQID</h2>
  <label for="id">traQID </label>
  <input id="id" v-model="traQID" type="string" />
  &nbsp;
  <button @click="login">Confirm</button>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { Auth } from "../tools/Auth";

  export default defineComponent({
    name: "Login",
    setup() {
      const auth = new Auth();
      auth.checkOnLogin();

      const traQID = ref("");

      const login = () => {
        auth.login(traQID.value);
      };

      return { traQID, login };
    },
  });
</script>
