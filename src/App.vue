<script setup lang="ts">
import { ref } from 'vue';
import { useGeneratePassword } from './composables/useGeneratePassword';

const sentence = ref('');

function submit(): void {
  useGeneratePassword(sentence.value.trim());
}
</script>

<template>
  <main>
    <section>
      <div id="generator" class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2
          class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
        >
          Acronym Password Generator
        </h2>
        <p
          class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl"
        >
          Use a phrase, saying or quote you know to generate your password.
        </p>
        <form @submit.prevent="submit" class="space-y-8">
          <div class="sm:col-span-2">
            <textarea
              id="sentence"
              v-model="sentence"
              rows="6"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            class="inline-block mx-auto py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-teal-700 sm:w-fit hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
          >
            Generate
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
