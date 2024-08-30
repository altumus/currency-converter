<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <div @click="getCurrency">test response</div>
  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">
      create-vue
    </a>
    , the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<script lang="ts">
import { useCurrencyStore } from '@/stores/currencyStore'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
      currencyStore: useCurrencyStore(),
    }
  },
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    getCurrency() {
      this.currencyStore.getCurrency()
    },
  },
})
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
