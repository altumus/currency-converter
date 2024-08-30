import * as currencyApi from '@/services/currency.service'
import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    usdCurrency: 0,
    eurCurrency: 0,
  }),
  actions: {
    async getCurrency() {
      await currencyApi.getCurrency()
    },
  },
})
