<template>
  <div class="todo-list">
    <h4>Todo List</h4>
    <div class="input-container">
      <input
          v-model="newTodo"
          @keyup.enter="addTodo"
          placeholder="Add a new task"
      />
      <button @click="addTodo">Add</button>
    </div>
    <ul>
      <li v-for="(todo, index) in todos" :key="index" :class="{ completed: todo.completed }">
        <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleComplete(index)"
        />
        <span>{{ todo.text }}</span>
        <button class="delete-btn" @click="removeTodo(index)">×</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TodoList',
  setup() {
    const newTodo = ref('');
    const todos = ref([
      { text: 'Learn Vue.js', completed: true },
      { text: 'Build a Micro Frontend app', completed: false },
      { text: 'Add more features', completed: false }
    ]);

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({ text: newTodo.value, completed: false });
        newTodo.value = '';
      }
    };

    const toggleComplete = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const removeTodo = (index) => {
      todos.value.splice(index, 1);
    };

    return { newTodo, todos, addTodo, toggleComplete, removeTodo };
  }
}
</script>

<style scoped>
.todo-list {
  margin: 20px 0;
  padding: 15px;
  background-color: #e6f7ff;
  border-radius: 4px;
}

.input-container {
  display: flex;
  margin-bottom: 10px;
}

input[type="text"] {
  flex-grow: 1;
  padding: 6px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin-right: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.delete-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: #ff4d4f;
  font-size: 18px;
  cursor: pointer;
}

.delete-btn:hover {
  color: #ff7875;
}
</style>