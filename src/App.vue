<template>
  <div class="flex flex-col w-full h-screen">
    <MainMenu />
    <RouterView />
  </div>
</template>

<script lang="ts">
import MainMenu from '@/components/MainMenu.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    MainMenu,
  },
})
</script>
