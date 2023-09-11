<!-- src/components/AddTodo.vue -->

<template>
  <div class="pb-12 lg:flex lg:justify-center lg:items-center">
    <!-- <h2>Add a New Todo</h2> -->
    <div class="lg:pr-10">
      <input
        v-model="newTodo"
        required
        placeholder="Enter a new todo"
        type="text"
        class="mr-4 placeholder:italic placeholder:text-slate-400 bg-white w-1/3 lg:w-full max-sm:w-11/12 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
      />
    </div>

    <div class="max-sm:pl-4 max-sm:text-left">
      <label class="max-sm:mr-16"> Due Date </label>
      <input
        type="date"
        required
        v-model="customDate"
        class="max-sm:mt-4 placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        @change="handleDueDate"
      />
    </div>

    <div class="max-sm:text-left lg:pl-4">
      <button
        type="submit"
        class="max-sm:mt-4 flex-no-shrink p-2 ml-2 border-2 rounded"
        @click="addNewTodo"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid";
import moment from 'moment';

export default {
  data() {
    return {
      newTodo: "",
      customDate: moment(),
      dueDate: "",
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    addNewTodo() {
      if (this.newTodo.trim() === "" || this.dueDate === "") {
        alert('Please fill all the fields')
        return
      }
      this.addTodo({
        index: uuidv4(),
        completed: false,
        text: this.newTodo,
        dueDate: this.dueDate,
      });
      this.newTodo = "";
      this.dueDate = "";
      this.customDate = "";
    },

    handleDueDate(event) {
      this.dueDate = new Date(event.target.value).toISOString();
    },
  },
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>
