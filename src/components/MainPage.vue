<template>
  <div
    class="p-4 mt-[50px] max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4"
  >
    <div class="text-xl font-semibold text-gray-700 text-center">
      Стоимость валют к рублю
    </div>

    <div v-if="loading" class="text-center">
      <span class="text-gray-500">Загрузка...</span>
    </div>

    <div v-if="!loading && error" class="text-center">
      <span class="text-red-500">Что-то пошло не так</span>
    </div>

    <div v-if="!loading && !error">
      <div class="flex justify-between">
        <span class="text-gray-600">USD</span>
        <span class="text-gray-900">{{ rates['usd-rub'].toFixed(2) }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-gray-600">EUR</span>
        <span class="text-gray-900">{{ rates['eur-rub'].toFixed(2) }}</span>
      </div>
    </div>

    <button
      @click="getRates"
      class="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
    >
      Обновить курс
    </button>
  </div>
</template>

<script lang="ts">
import { useCurrencyStore } from '@/stores/currencyStore'
import { ExchangeRates } from '@/types/types'
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainPage',
  data() {
    return {
      loading: true as boolean,
      error: null as String | null,
    }
  },
  computed: {
    ...mapStores(useCurrencyStore),
    rates(): ExchangeRates {
      return this.currencyStore.rates
    },
  },
  methods: {
    async getRates(): Promise<void> {
      try {
        this.loading = true
        await this.currencyStore.getCurrency()
        this.loading = false
      } catch (error) {
        this.error = 'Что-то пошло не так'
        this.loading = false
      }
    },
  },
  created() {
    this.getRates()
  },
})
</script>
