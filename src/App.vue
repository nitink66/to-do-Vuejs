<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <h1 class="text-5xl bg_light_blue mb-20 p-6">To Do Application</h1>
    <AddTodo />

    <div>
      <div class="mb-4 flex justify-center">
        <ul
          class="flex flex-wrap -mb-px tabs bg-slate-200"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li class="mr-2" role="presentation">
            <button
              class="inline-block br_right text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
              id="profile-tab"
              type="button"
              role="tab"
              @click="showCompleted = false"
            >
              Pending Tasks
            </button>
          </li>

          <li class="mr-2" role="presentation">
            <button
              class="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
              type="button"
              role="tab"
              @click="showCompleted = true"
            >
              Completed Tasks
            </button>
          </li>
        </ul>
      </div>

      <div v-if="showCompleted">
        <CompletedTasksTab />
      </div>

      <div v-else>
        <NonCompletedTasksTab />
      </div>
    </div>
  </div>
</template>

<script>
// import TodoList from "./components/ToDoList.vue";
import AddTodo from "./components/AddToDo.vue";

import CompletedTasksTab from "./components/CompletedTasksTab.vue";
import NonCompletedTasksTab from "./components/NonCompletedTasksTab.vue";

export default {
  name: "App",
  components: {
    // TodoList,
    AddTodo,
    CompletedTasksTab,
    NonCompletedTasksTab,
  },
  data() {
    return {
      showCompleted: false, // Initially show non-completed tasks
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.bg_light_blue {
  background-color: rgb(173, 216, 230);
}

.br_right {
  border-right: 1px solid !important;
}

.tabs {
  border: 2px solid lightgray;
  border-radius: 20px;
}

.br_right {
  border-right: 1px solid;
}
</style>
