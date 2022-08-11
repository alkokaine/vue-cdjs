<template>
  <div class="cd-month">
    <slot></slot>
    <div v-loading="isLoading" class="cd-days--container">
      {{ days }}
    </div>
  </div>
</template>

<script>
import { getDays } from '@/common/month-days'
import { Loading } from 'element-ui'

const formatter = (locale, date, options = { month: 'long' }) => (new Intl.DateTimeFormat(locale, options).format(date))

export default {
  name: 'cd-month',
  props: {
    sixDays: { type: Boolean, default: false, description: 'Шестидневная рабочая неделя' },
    date: { type: Date, required: true, description: 'Начальная дата календаря' },
    locale: { type: String, default: 'ru-RU', description: 'Локаль календаря' },
    prependDays: { type: Boolean, default: true, description: 'Дополнять ли массив дней месяца днями предыдущего месяца' }
  },
  directives: {
    'loading': Loading
  },
  data (calendar) {
    return {
      payload: {
        MonthID: calendar.date.getMonth() + 1,
        Year: calendar.date.getFullYear(),
        Day: calendar.date.getDate()
      },
      days: getDays(calendar.date).then(response => {
        calendar.days = response
        calendar.isLoading = false
      }),
      isLoading: Boolean
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