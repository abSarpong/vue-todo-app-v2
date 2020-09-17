<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="form-style">
        <input type="text" v-model="newTodo" placeholder="What's next?" />
        <button type="submit" class="primary-button">Add ToDo</button>
      </div>
    </form>
  </div>
</template>

<script>
import { CREATE_TODOS } from "@/graphql/mutations";
import { GET_ALL_TODOS } from "@/graphql/queries";

export default {
  name: "AddToDo",
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    async onSubmit() {
      await this.$apollo.mutate({
        mutation: CREATE_TODOS,
        variables: {
          title: this.newTodo,
        },
        update: (cache, { data: { insert_todos } }) => {
          const data = cache.readQuery({
            query: GET_ALL_TODOS,
          });
          const insertTodo = insert_todos.returning;
          data.todos.push(insertTodo[0]);
          cache.writeQuery({
            query: GET_ALL_TODOS,
            data,
          });
        },
      });
      this.newTodo = "";
    },
  },
};
</script>

<style>
label {
  font-size: 16px;
  color: #707070;
}
input[type="text"] {
  margin: 8px 0 16px 0px;
  padding: 8px 25px;
  font-size: 20px;
  margin-right: 8px;
  width: 300px;
  border: 1px solid #cccccc;
  height: 40px;
}
input[type="text"]:focus {
  margin: 8px 0 16px 0px;
  padding: 8px 25px;
  font-size: 20px;
  margin-right: 8px;
  width: 300px;
  border: 1px solid #cccccc;
  height: 40px;
}
.edit-form-style {
  margin-bottom: 16px;
}
::placeholder {
  font-size: 16px;
  color: #a3a3a3;
}
.primary-button {
  padding: 8px 12px;
  font-size: 16px;
  background: #333333;
  color: #ffffff;
  font-weight: 600;
  height: 57px;
  width: 140px;
}
.secondary-button {
  padding: 8px 12px;
  font-size: 16px;
  color: #707070;
  border: none;
  font-weight: 600;
  height: 57px;
  width: 140px;
}
</style>
