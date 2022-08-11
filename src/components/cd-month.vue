<template>
  <div class="cd-month">
    <slot></slot>
    <div class="cd-days--container">
      {{ days }}
    </div>
  </div>
</template>

<script>
import { getDays } from '@/common/month-days'

const formatter = (locale, date, options = { month: 'long' }) => (new Intl.DateTimeFormat(locale, options).format(date))
export default {
  name: 'cd-month',
  props: {
    sixdays: { type: Boolean, default: false, description: 'Шестидневная рабочая неделя' },
    date: { type: Date, required: true, description: 'Начальная дата календаря' },
    locale: { type: String, default: 'ru-RU', description: 'Локаль календаря' },
  },
  data (calendar) {
    return {
      payload: {
        MonthID: calendar.date.getMonth() + 1,
        Year: calendar.date.getFullYear(),
        Day: calendar.date.getDate()
      },
      days: [],
      isLoading: Boolean
    }
  },
  watch: {
    date: {
      handler (newvalue) {
        if (newvalue !== undefined) {
          const calendar = this
          calendar.isLoading = true
    
          getDays(newvalue, (result) => {
            calendar.days = result
            calendar.isLoading = false
          })
        }
      }
    }
  },
  computed: {
    formatDate () {
      return formatter(this.locale, this.date)
    }
  },
  methods: {
    populateDays(payload) {
    }
  },
  mounted () {
  }
}

</script>

<style>

</style>