<template>
  <div>
    <h1>{{ msg }}</h1>
    <counter />
  </div>
</template>

<script>
import Counter from "./Counter.vue";

export default {
  components: {
    Counter,
  },
  props: {
    msg: {
      type: String,
      default: "",
    },
  },
};
</script>
