<template>
  <div>ItemList</div>
  <div v-for="item in items" :key="item.name">
    <div class="item" :class="{ over500: item.price >= 500 }">
      <div class="name>">{{ item.name }}</div>
      &nbsp;/&nbsp;
      <div class="price">値段: ￥{{ item.price }}</div>
      <div v-if="item.price >= 1000" class="ifExpensive">
        &nbsp;←&nbsp;!!!高額商品!!!
      </div>
    </div>
  </div>
  <div class="input">
    <label for="name">名前</label>
    <input id="name" v-model="newItemName" type="text" />
    <label for="price">値段</label>
    <input id="price" v-model="newItemPrice" type="number" />
    <button @click="addItem">Add to List</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ItemList",
  setup() {
    const items = ref([
      { name: "たまご", price: 100 },
      { name: "りんご", price: 150 },
    ]);

    const newItemName = ref("");
    const newItemPrice = ref(0);

    const addItem = () => {
      items.value.push({ name: newItemName.value, price: newItemPrice.value });
    };

    return { items, newItemName, newItemPrice, addItem };
  },
};
</script>

<style>
.item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.over500 {
  color: red;
}
</style>
