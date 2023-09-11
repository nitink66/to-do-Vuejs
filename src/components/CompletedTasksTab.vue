<!-- src/components/CompletedTasksTab.vue -->
<template>
  <div>
    <div v-if="completedTodos.length === 0">
      <p>No tasks</p>
    </div>
    <div
      class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans"
    >
      <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div
          v-for="(todo, index) in completedTodos"
          :key="index"
          class="flex mb-4 items-center"
        >
          <p class="w-full text-green text-left overflow-scroll">
            {{ todo.text }} - Due date -
            {{ moment(todo.dueDate).format("DD-MM-YYYY hh:mm:a") }}
          </p>

          <button
            class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getCompletedTodos"]),
    completedTodos() {
      return this.getCompletedTodos;
    },
  },
  methods: {
    ...mapActions(["markTodoAsNonCompleted", "removeTodo"]),
    markAsNonCompleted(index) {
      this.$store.dispatch("markTodoAsNonCompleted", index);
    },
    showConfirmationModal(index) {
      this.selectedTaskIndex = index;
      this.showModal = true;
    },
    hideConfirmationModal() {
      this.selectedTaskIndex = null;
      this.showModal = false;
    },
    removeCompletedTodo() {
      if (this.selectedTaskIndex !== null) {
        this.$store.dispatch("removeTodo", this.selectedTaskIndex);
        this.hideConfirmationModal();
      }
    },
  },
  data() {
    return {
      showModal: false,
      selectedTaskIndex: null,
    };
  },
};
</script>
