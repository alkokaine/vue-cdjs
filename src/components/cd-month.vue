<template>
  <div class="cd-month">
    <slot></slot>
    <div v-loading="isLoading" class="cd-days--container">
      <cd-list :collection="weekdays" keyfield="day" rowClass="cd-weekday--container col" list-class="list-unstyled container row">
        <cd-list v-if="monthdays.length" slot-scope="{ row }" keyfield="day" class="cd-weekday--list-wrapper" list-class="cd-weekday--list list-unstyled container" row-class="cd-day p-1 m-1 border border-1" :collection="resolvedays(row)">
          <div slot="header" class="cd-weekday--header text-center">
            {{ row.weekday.long }}
          </div>
          <div slot-scope="day" class="cd-day--content" :class="{ 'is-prev': day.row.isprev }">
            {{ day.row.date }}
          </div>
        </cd-list>
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
    date: { type: Date, required: true, description: 'Начальная дата календаря' },
    sixDays: { type: Boolean, default: false, description: 'Шестидневная рабочая неделя' },
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
      monthdays: getDays(calendar.date).then(response => {
        calendar.monthdays = calendar.prependDays ? prevMonthDays(calendar.date).concat(response) : response
        calendar.isLoading = false
      }),
      isLoading: Boolean
    }
  },
  watch: {
    date: {
      handler (newvalue, oldvalue) {
        const month = this
        if (newvalue !== undefined) {
          if (oldvalue === undefined || (newvalue.getFullYear() !== oldvalue.getFullYear() || newvalue.getMonth() !== oldvalue.getMonth() )) {
            month.isLoading = true
            getDays(newvalue, { pre: 1, covid: 1, sd: month.sixDays }).then(response => {
              month.monthdays = month.prependDays ? prevMonthDays(newvalue).concat(response) : response
              month.isLoading = false
            })
          }
        }
      }
    }
  },
  computed: {
    weekdayid () {
      return (row, index) => row.day
    },
    resolvedays () {
      const month = this
      return (row) => {
        return month.monthdays.filter(d => d.date.day() === row.day)
      }
    }
  },
  methods: {
  }
}

</script>

<style>
  .cd-weekday--container {
    width: 12%;
  }
  .is-prev {
    opacity: 42%;
  }
</style>