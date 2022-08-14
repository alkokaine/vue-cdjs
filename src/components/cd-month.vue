<template>
  <div class="cd-month">
    <slot></slot>
    <div v-loading="isLoading" class="cd-days--container">
      <cd-list :collection="weekdays" keyfield="day" rowClass="cd-weekday--container">
        <template slot-scope="scope">
          <cd-list keyfield="day" class="cd-weekday--list" row-class="cd-day" :collection="scope.row.details">
            <div slot="header" class="cd-weekday--header">
              {{index}}: {{ scope.row.weekday.long }}
            </div>
          </cd-list>
        </template>
      </cd-list>
    </div>
  </div>
</template>

<script>
import { prevMonthDays, getDays, weekdays } from '@/common/month-days'
import { Loading } from 'element-ui'
import CDList from '@/components/cd-list.vue'
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
  components: {
    'cd-list': CDList
  },
  data (calendar) {
    return {
      weekdays,
      days: getDays(calendar.date).then(response => {
        calendar.days = calendar.prependDays
          ? (prevMonthDays(calendar.date)).concat(response) 
          : response,
        calendar.isLoading = false
      }),
      isLoading: Boolean
    }
  },
  computed: {
    weekdayid () {
      return (row, index) => row.day
    },
    // weekdays () {
    //   return this.weekmap(this.days)
    // }
  },
  methods: {
    // weekmap (days) {
    //   return (weekdays.map(wd => ({ day: wd.day, weekday: wd, details: [] })))
    // }
  }
}

</script>

<style>

</style>