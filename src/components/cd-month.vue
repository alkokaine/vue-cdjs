<template>
  <div class="cd-month container">
    <slot></slot>
    <div v-loading="isLoading" class="cd-days--container">
      <cd-list :collection="weekdays" keyfield="day" rowClass="cd-weekday--container col px-0" list-class="list-unstyled container row w-auto">
        <cd-list v-if="monthdays.length" slot-scope="{ row }" keyfield="day" class="cd-weekday--list-wrapper" list-class="cd-weekday--list px-0 list-unstyled container" row-class="cd-day border border-1 text-center" :collection="resolvedays(row)">
          <div slot="header" class="cd-weekday--header text-center" :class="[{ 'holiday': !sixDays && row.day === 6 || row.day === 0 }]">
            {{ row.weekday.short }}
          </div>
          <cd-day slot-scope="day" class="cd-day--content p-2" :class="{ 'is-prev': day.row.isprev, 'holiday': (sixDays ? ((day.row.code === 1 && day.row.day !== 6)|| day.row.day === 0) : day.row.code === 1 )}">
            <div slot="header" class="cd-day--header-content">
              <slot name="header" :day="day.row">
                {{ day.row.date.date() }}
              </slot>
            </div>
          </cd-day>
        </cd-list>
      </cd-list>
    </div>
  </div>
</template>

<script>
import { prevMonthDays, getDays, weekdays } from '@/common/month-days'
import { Loading } from 'element-ui'
import CDList from '@/components/cd-list.vue'
import CDDay from '@/components/cd-day.vue'
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
    'cd-list': CDList,
    'cd-day': CDDay
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
            getDays(newvalue, { pre: 1, covid: 1, sd: (month.sixDays === true ? 1 : 0) }).then(response => {
              month.monthdays = month.prependDays ? prevMonthDays(newvalue).concat(response) : response
              month.isLoading = false
            })
          }
        }
      }
    },
    sixDays: {
      handler (newvalue) {
        const month = this
        getDays(month.date, { pre: 1, covid: 1, sd: (newvalue === true ? 1 : 0) }).then(response => {
          month.monthdays = month.prependDays ? prevMonthDays(month.date).concat(response) : response
          month.isLoading = false
        })
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
    },
    resolvedate () {
      return (row) => row.date.toDate()
    }
  },
  methods: {
  }
}

</script>

<style>
  .cd-weekday--container {
    max-width: min-content;
  }
  .is-prev {
    opacity: 42%;
    pointer-events: none;
    cursor: default;
    user-select: none;
  }
  .holiday {
    color: salmon;
    font-weight: bold;
  }
</style>