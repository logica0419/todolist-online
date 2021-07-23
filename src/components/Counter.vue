<template>
  <div>
    <div>{{ countMessage }}</div>
    <button @click="count++">クリック！</button>
    <button @click="count = 0">リセット！</button>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "Counter",
  setup() {
    const count = ref(0);
    const countMessage = computed(() => "回数: " + count.value);
    return { count, countMessage };
  },
};
</script>
