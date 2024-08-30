<!-- src/components/Header.vue -->
<template>
  <header class="bg-blue-600 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-lg font-bold">Конвертер валют</h1>
      <nav>
        <ul class="flex space-x-4">
          <li>
            <router-link to="/" class="hover:text-blue-300">
              Главная
            </router-link>
          </li>
          <li>
            <router-link to="/convert" class="hover:text-blue-300">
              Конвертация
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainMenu',
})
</script>

<style scoped>
/* Ваши стили здесь */
</style>
