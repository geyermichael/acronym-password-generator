<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { useClipboard } from '@vueuse/core';
import { useGeneratePassword } from './composables/useGeneratePassword';

const { copy, copied } = useClipboard();
const sentence = ref('');
const password = ref('');
const pending = ref(false);
const error = ref(false);
const options = reactive({
  useNumbers: false,
});
function submit(): void {
  password.value = '';
  error.value = false;

  if (sentence.value === '') {
    error.value = true;
    return;
  }

  pending.value = true;
  setTimeout(() => {
    try {
      password.value = useGeneratePassword(sentence.value, {
        useNumbers: options.useNumbers,
      });
      pending.value = false;
    } catch (err) {
      error.value = true;
      pending.value = false;
    }
  }, 450);
}

watch(sentence, () => {
  if (sentence.value === '') {
    error.value = true;
  } else {
    error.value = false;
  }
});
</script>

<template>
  <main class="min-h-screen bg-white dark:bg-gray-900">
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
              :placeholder="
                error
                  ? 'You have to provide a phrase, saying or quote.'
                  : 'The pen is mightier than the sword.'
              "
              :class="
                error
                  ? 'outline outline-1 outline-red-500 placeholder:text-red-500'
                  : ''
              "
            ></textarea>
          </div>
          <div class="flex justify-center">
            <label
              for="teal-toggle"
              class="inline-flex relative items-center mr-5 cursor-pointer"
            >
              <input
                type="checkbox"
                v-model="options.useNumbers"
                id="teal-toggle"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"
              ></div>
              <span
                class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Numbers</span
              >
            </label>
          </div>
          <button
            :disabled="error"
            type="submit"
            class="flex items-center justify-center mx-auto min-w-[12rem] py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-teal-700 sm:w-fit hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 disabled:bg-gray-300"
          >
            <svg
              v-if="pending"
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            <span v-if="!pending"> Generate </span>
          </button>
        </form>
        <div v-if="password">
          <div class="mb-6">
            <label
              for="default-input"
              class="flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <span>Generated password</span>
              <button
                @click="copy(password)"
                type="button"
                data-copy-state="copy"
                class="flex items-center py-2 px-3 text-xs font-medium text-gray-600 bg-gray-100 border-gray-200 dark:border-gray-600 dark:text-gray-400 dark:bg-gray-800 hover:text-blue-700 dark:hover:text-white"
              >
                <svg
                  class="mr-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>{{ copied ? 'Copied' : 'Copy' }}</span>
              </button>
            </label>
            <input
              v-model="password"
              type="text"
              id="default-input"
              class="bg-gray-50 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
            />
          </div>
        </div>
      </div>
    </section>
    <footer class="container mx-auto flex justify-center">
      <a
        class="font-medium text-teal-600 dark:text-teal-500 hover:underline"
        href="https://github.com/geyermichael/acronym-password-generator"
      >
        GitHub
      </a>
    </footer>
  </main>
</template>

<style scoped></style>
