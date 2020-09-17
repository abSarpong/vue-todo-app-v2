<template>
  <div id="app">
    <div class="wrapper">
      <add-to-do></add-to-do>
      <todo-item></todo-item>
    </div>
  </div>
</template>

<script>
import TodoItem from "../components/TodoItem.vue";
import AddToDo from "../components/AddToDo.vue";
export default {
  name: "Home",
  components: { TodoItem, AddToDo },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.wrapper {
  width: 500px;
  margin: 0 auto;
  padding-top: 96px;
}
.empty-state {
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 100px;
}
</style>
