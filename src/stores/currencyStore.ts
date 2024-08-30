import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    usdCurrency: 0,
    eurCurrenct: 0,
  }),
})
