<template>
  <div id="app">
    <div class="container">
      <h2>Complete CRUD Todo Application</h2>
      <div class="wrapper">
        <add-to-do></add-to-do>
        <todo-item></todo-item>
      </div>
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
.container {
  padding-top: 48px;
  text-align: center;
}
.wrapper {
  width: 500px;
  margin: 0 auto;
  padding-top: 48px;
}
</style>
