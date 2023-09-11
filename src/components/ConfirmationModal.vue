<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white p-4 rounded shadow-lg">
        <p class="mb-2">{{ message }}</p>
        <div class="flex justify-end">
          <button @click="cancel" class="px-4 py-2 mr-2 text-gray-600 hover:text-gray-800">Cancel</button>
          <button @click="confirm" class="px-4 py-2 bg-red-500 text-white hover:bg-red-600">Confirm</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean,
      message: String,
    },
    methods: {
      confirm() {
        this.$emit('confirm'); // Emit a custom event 'confirm'
      },
      cancel() {
        this.$emit('cancel'); // Emit a custom event 'cancel'
      },
    },
  };
  </script>
  