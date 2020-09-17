<template>
  <div class="wrapper">
    <form @submit.prevent="onEditSave" action>
      <br />
      <input type="text" v-model="todoDetails.title" />
      <div class="button-group">
        <router-link :to="{name: 'home'}" class="button">
          <button class="secondary-button">
            <span style="font-size: 20px"></span>
            Cancel
          </button>
        </router-link>
        <button type="submit" class="primary-button">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import { GET_TODO_DETAILS } from "@/graphql/queries";
import { UPDATE_TODO } from "@/graphql/mutations";
import { GET_ALL_TODOS } from "@/graphql/queries";

export default {
  name: "EditTodo",
  mounted: function () {
    this.todoId = this.$route.params.todoId;
  },
  data() {
    return {
      todoId: null,
    };
  },
  apollo: {
    todo: {
      query: GET_TODO_DETAILS,
      variables() {
        return {
          id: this.todoId,
        };
      },
    },
  },
  methods: {
    async onEditSave() {
      await this.$apollo.mutate({
        mutation: UPDATE_TODO,
        variables: {
          id: this.todoId,
          title: this.todoDetails.title,
        },
        update: (cache, { data: { update_todos } }) => {
          if (update_todos.affected_rows) {
            const data = cache.readQuery({
              query: GET_ALL_TODOS,
            });
            const todoIndex = data.todos.findIndex(
              (todo) => todo.id === this.todoId
            );
            data.todos[todoIndex].title = this.todoDetails.title;

            cache.writeQuery({
              query: GET_ALL_TODOS,
              data,
            });
          }
        },
      });
      this.$router.push({ name: "home" });
    },
  },
  computed: {
    todoDetails() {
      if (this.$apollo.queries.todo.loading) return {};
      return this.todo[0];
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 300px;
  margin: 0 auto;
  padding-top: 96px;
}
.button-group > .button {
  margin-right: 20px;
}
/* media queries */
.break-point {
  width: 200px;
}
</style>