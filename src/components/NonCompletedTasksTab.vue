<!-- src/components/NonCompletedTasksTab.vue -->
<template>
  <div class="">
    <div v-if="nonCompletedTodos.length === 0">
      <p>No tasks</p>
    </div>

    <div
      class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans"
    >
      <div
        class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg"
        v-bind:class="editingTask && 'max-sm:ml-0 max-sm:pl-0'"
      >
        <div
          v-for="(todo, index) in nonCompletedTodos"
          :key="index"
          class="flex mb-4 items-center"
        >
          <p
            class="w-full text-green text-left overflow-scroll"
            v-bind:class="
              todo.dueDate < new Date().toISOString()
                ? 'text-red-500'
                : 'text-slate-500'
            "
            v-if="!editingTask && currentEditingIndex !== todo.index"
          >
            {{ todo.text }} - Due date -
            {{ moment(todo.dueDate).format("DD-MM-YYYY hh:mm:a") }}
          </p>

          <p class="p-4">
            <img
              :src="Tick"
              class="w-10 cursor-pointer"
              title="Mark as Completed"
              v-if="!editingTask"
              @click="markAsCompleted(todo.index)"
              alt="tick"
            />
          </p>

          <button
            @click="showConfirmationModal(index)"
            v-if="!editingTask"
            class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
          >
            Remove
          </button>

          <button
            class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
            @click="toggleEditing(todo.text, todo.index, todo.dueDate)"
            v-if="!editingTask"
          >
            Update
          </button>

          <div v-if="editingTask && currentEditingIndex === todo.index">
            <input
              @change="onChangeUpdateTodoTask"
              v-model="newUpdateField"
              required
              placeholder="Update"
              type="text"
              class="max-sm:w-full placeholder:italic placeholder:text-slate-400 bg-white w-auto border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            />

            <label class="ml-4 max-sm:mr-16"> Due Date </label>
            <input
              type="date"
              required
              v-model="customDate"
              class="max-sm:mt-6 placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              @change="handleDueDate"
            />
            <button
              @click="UpdateExistingTask(todo.index)"
              class="p-2 ml-2 border-2 rounded mt-6"
            >
              Update task
            </button>
            <button
              @click="CancelExistingTask(todo.text)"
              class="p-2 ml-2 border-2 rounded mt-6"
            >
              Cancel task
            </button>
          </div>
        </div>
      </div>
    </div>

    <ConfirmationModal
      :show="showModal"
      message="Are you sure you want to remove this task?"
      @confirm="removeNonCompletedTodo"
      @cancel="hideConfirmationModal"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ConfirmationModal from "./ConfirmationModal.vue";
import moment from "moment";

export default {
  components: {
    ConfirmationModal,
  },
  computed: {
    ...mapGetters(["getNonCompletedTodos"]),
    nonCompletedTodos() {
      return this.getNonCompletedTodos;
    },
  },
  methods: {
    ...mapActions(["markTodoAsCompleted", "removeTodo", "updateToDo"]),
    markAsCompleted(todoId) {
      this.$store.dispatch("markTodoAsCompleted", todoId);
    },
    removeNonCompletedTodo(index) {
      if (this.selectedTaskIndex !== null) {
        this.removeTodo(index);
        this.showModal = false;
      }
    },

    showConfirmationModal(index) {
      this.selectedTaskIndex = index;
      this.showModal = true;
    },
    hideConfirmationModal() {
      this.selectedTaskIndex = null;
      this.showModal = false;
    },

    toggleEditing(newText, editingIndex, updatedDate) {
      this.newUpdateField = newText;
      this.customDate = moment(updatedDate).format("YYYY-MM-DD");
      this.editingTask = !this.editingTask;
      this.currentEditingIndex = editingIndex;
    },

    onChangeUpdateTodoTask(value) {
      if (value.target.value.trim() === "") return;
      this.newUpdateField = value.target.value.trim();
    },
    CancelExistingTask() {
      this.editingTask = null;
      this.currentEditingIndex = null;
      this.customDate = "";
    },

    UpdateExistingTask(newTodoindex) {
      this.updateToDo({
        newUpdateField: this.newUpdateField,
        newTodoindex,
        dueDate: this.customDate,
      });
      this.editingTask = null;
      this.currentEditingIndex = null;
      this.customDate = "";
    },
    handleDueDate(event) {
      this.customDate = event.target.value;
    },
  },
  data() {
    return {
      showModal: false,
      selectedTaskIndex: null,
      Tick: require("../assets/tick.svg"),
      editingTask: null,
      newUpdateField: "",
      currentEditingIndex: null,
      customDate: moment(),
    };
  },
};
</script>

<style scoped>
.hr_1 {
  height: 1rem !important;
}
</style>
