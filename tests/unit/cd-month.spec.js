import { createDate, prevMonthWeekLength } from '@/common/month-days'
import { mount } from '@vue/test-utils'
import CDMonth from '@/components/cd-month'
import CDDay from '@/components/cd-day'
import Vue from 'vue'
// Vue.config.errorHandler = (...args) => {
//   console.error(args)
// }
// Vue.config.warnHandler = (...args) => {
//   console.warn(args)
// }
const mountcalendar = (props) => (mount(CDMonth, {
  propsData: props,
  attrs: {
    class: 'cd-month--test'
  }
}))

describe('cd-month', () => {
  const testdate = createDate(2022, 9, 1)
  const propsData = {
    date: testdate.toDate(),
    sixDays: true
  }
  const doNotPrepend = {
    date: testdate.toDate(),
    sixDays: true,
    prependDays: false
  }
  const month_header = testdate.format("MMM YYYY")
  const days_in_month = testdate.daysInMonth()
  const weekday = testdate.format('dddd')
  const _x = prevMonthWeekLength(testdate.toDate())
 
  it ('CD-MONTH (Weekday list): contains 7 instances of [.cd-weekday--container] class', done => {
    const wrapper = mountcalendar(propsData)
    wrapper.vm.monthdays.then(() => {
      Vue.nextTick().then(() => {
        const weekdays = wrapper.findAll('.cd-weekday--container')
        const headers = wrapper.findAll('.cd-weekday--header')
        const weekdaylist = wrapper.findAll('.cd-weekday--list')
        const days = wrapper.findAllComponents(CDDay)
        expect(weekdays.length).toBe(7)
        expect(headers.length).toBe(7)
        expect(weekdaylist.length).toBe(7)
        expect(days.length).toBe(days_in_month + _x)
        done()
      })
    })
  }, 100000)
})