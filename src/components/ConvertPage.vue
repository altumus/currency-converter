<template>
  <div
    class="p-6 mt-[50px] max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4"
  >
    <div class="text-xl font-semibold text-gray-700 text-center">
      Конвертер валют
    </div>

    <div v-if="loading" class="text-center">
      <span class="text-gray-500">Загрузка...</span>
    </div>

    <div v-if="!loading && error" class="text-center">
      <span class="text-red-500">Что-то пошло не так</span>
    </div>

    <div v-if="!loading && !error" class="space-y-4">
      <!-- Первая строка ввода -->
      <div class="flex justify-between items-center gap-x-[10px]">
        <select
          v-model="currencyFrom"
          @change="convertCurrency('from')"
          class="w-1/3 p-2 border border-gray-300 rounded-lg"
        >
          <option v-for="rate in filteredRatesFrom" :key="rate" :value="rate">
            {{ rate }}
          </option>
        </select>
        <input
          type="number"
          id="inputFrom"
          v-model.number="amountFrom"
          @input="convertCurrency('from', $event)"
          class="w-2/3 p-2 border border-gray-300 rounded-lg text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      <!-- Вторая строка ввода -->
      <div class="flex justify-between items-center gap-x-[10px]">
        <select
          v-model="currencyTo"
          @change="convertCurrency('to')"
          class="w-1/3 p-2 border border-gray-300 rounded-lg"
        >
          <option v-for="rate in filteredRatesTo" :key="rate" :value="rate">
            {{ rate }}
          </option>
        </select>
        <input
          id="inputTo"
          type="number"
          v-model.number="amountTo"
          @input="convertCurrency('to')"
          class="w-2/3 p-2 border border-gray-300 rounded-lg text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      <div v-if="amountError" class="text-center">
        <span class="text-red-500">{{ amountError }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCurrencyStore } from '@/stores/currencyStore'
import { CurrencyPair } from '@/types/types'
import { mapStores } from 'pinia'

export default {
  data() {
    return {
      currencyFrom: 'RUB' as String, // Валюта по умолчанию
      currencyTo: 'USD' as String, // Валюта по умолчанию
      amountFrom: 100 as number,
      amountTo: 1 as number,
      loading: false,
      error: null as String | null,
      amountError: null as String | null,
    }
  },
  computed: {
    ...mapStores(useCurrencyStore),
    allowedCurrencies() {
      return ['RUB', 'USD', 'EUR']
    },
    rates() {
      return this.currencyStore.rates
    },
    currencyPair() {
      return this.currencyFrom + '-' + this.currencyTo
    },
    filteredRatesFrom() {
      return this.allowedCurrencies.filter((key) => key !== this.currencyTo)
    },
    filteredRatesTo() {
      return this.allowedCurrencies.filter((key) => key !== this.currencyFrom)
    },
  },
  methods: {
    convertCurrency(direction = 'from', event?: InputEvent): void {
      // на момент установки точки в качестве разделителя значение из input превращается в строку
      if (String(this.amountFrom) === '' || String(this.amountTo) === '') {
        return
      }

      if (this.amountFrom < 0 || this.amountTo < 0) {
        this.amountError = 'Введите корректное число'
        return
      }

      if (event && this.amountFrom && this.amountTo) {
        const input = event.target as HTMLInputElement

        const numberParts = input.value.split('.')
        if (numberParts.length > 1 && numberParts[1].length > 2) {
          input.value = parseFloat(input.value).toFixed(2)
        }
      }

      this.amountFrom = Number(this.amountFrom.toFixed(2))
      this.amountTo = Number(this.amountTo.toFixed(2))

      if (direction === 'from') {
        const currencyKey = (this.currencyFrom.toLowerCase() +
          '-' +
          this.currencyTo.toLocaleLowerCase()) as CurrencyPair
        const currencyValue = this.rates[currencyKey]

        this.amountTo = Number((this.amountFrom * currencyValue).toFixed(2))
      } else {
        const currencyKey = (this.currencyTo.toLowerCase() +
          '-' +
          this.currencyFrom.toLowerCase()) as CurrencyPair
        const currencyValue = this.rates[currencyKey]

        this.amountFrom = Number((this.amountTo * currencyValue).toFixed(2))
      }
    },
  },
  async mounted() {
    try {
      this.loading = true
      await this.currencyStore.getCurrency()
      this.loading = false

      // запускаем рассчет
      this.convertCurrency('from')
    } catch (error) {
      this.loading = false
      this.error = 'Что-то пошло не так'
    }
  },
}
</script>

<style scoped>
/* Дополнительные стили, если необходимы */
</style>
