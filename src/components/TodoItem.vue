<template>
  <div>
    <div v-if="$apollo.queries.todos.loading" style="text-align: center">Loading...</div>
    <div v-for="todo in todos" :key="todo.id">
      <div class="todo-style">
        <div v-if="todo.completed">
          <input type="checkbox" checked="true" @change="markComplete(todo)" />
          <span style="padding-left: 8px" class="completed">{{todo.title}}</span>
        </div>
        <div v-else>
          <input type="checkbox" @change="markComplete(todo)" />
          {{todo.title}}
        </div>
        <span>
          <router-link :to="{name: 'edit-todo', params:{todoId: todo.id}}">
            <span class="edit-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#3867d6"
                style="width: 16px"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
            </span>
          </router-link>
          <span class="delete-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#e74c3c"
              style="width: 16px"
              @click="deleteTodo(todo)"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_ALL_TODOS } from "@/graphql/queries";
import { DELETE_TODO } from "@/graphql/mutations";
import { MARK_COMPLETE } from "@/graphql/mutations";

export default {
  name: "TodoItem",
  props: {
    id: { type: String },
    title: { type: String },
    completed: { type: Boolean },
  },
  data() {
    return {
      editMode: false,
      // todos: [],
      isComp: false,
    };
  },
  apollo: {
    todos: {
      query: GET_ALL_TODOS,
    },
  },
  computed: {
    isCompleted() {
      return this.completed;
    },
  },
  methods: {
    someFunc(todo) {
      this.isComp = !this.isComp;
      console.log(todo);
    },
    async markComplete(todo) {
      await this.$apollo.mutate({
        mutation: MARK_COMPLETE,
        variables: {
          id: todo.id,
          isCompleted: !todo.completed,
        },
        update: (store, { data: { update_todos } }) => {
          if (update_todos.affected_rows) {
            const data = store.readQuery({
              query: GET_ALL_TODOS,
            });
            const completedTodo = data.todos.find(
              (item) => item.id === todo.id
            );
            completedTodo.completed = !completedTodo.completed;
            store.writeQuery({
              query: GET_ALL_TODOS,
              data,
            });
          }
        },
        optimisticResponse: {
          __typename: "Mutation",
          update_todos: {
            __typename: "todos",
            id: todo.id,
            completed: !todo.completed,
            affected_rows: 1,
          },
        },
      });
    },
    async deleteTodo(todo) {
      await this.$apollo.mutate({
        mutation: DELETE_TODO,
        variables: {
          id: todo.id,
        },
        update: (cache, { data: { delete_todos } }) => {
          if (delete_todos.affected_rows) {
            const data = cache.readQuery({
              query: GET_ALL_TODOS,
            });
            data.todos = data.todos.filter((new_todo) => {
              return new_todo.id !== todo.id;
            });
            cache.writeQuery({
              query: GET_ALL_TODOS,
              data,
            });
          }
        },
      });
    },
  },
};
</script>

<style>
.completed {
  text-decoration: line-through solid red;
}
.todo-style {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: none;
  list-style-type: none;
  padding: 16px 24px;
  margin-bottom: 8px;
  background-color: #f6f8fa;
  font-size: 16px;
}
.delete-button {
  background: #e8e8e8;
  height: 16px;
}
.delete-icon {
  padding: 6px 5px 2px 5px;
  background-color: rgb(248, 182, 175, 0.4);
  border-radius: 50%;
}
.edit-icon {
  padding: 6px 5px 2px 5px;
  background-color: rgba(199, 224, 243, 0.4);
  border-radius: 50%;
  margin-right: 16px;
}
</style>
