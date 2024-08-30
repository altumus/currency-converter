import * as currencyApi from '@/services/currency.service'
import { ExchangeRates } from '@/types/types'
import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    rates: {} as ExchangeRates,
  }),
  actions: {
    async getCurrency() {
      const response = await currencyApi.getCurrency()
      this.setCurrency(response)
    },
    setCurrency(rates: ExchangeRates) {
      this.rates = rates
    },
  },
})
