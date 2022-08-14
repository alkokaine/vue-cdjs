import { createDate, prevMonthWeekLength } from '@/common/month-days'
import { mount } from '@vue/test-utils'
import CDMonth from '@/components/cd-month'
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

  // const wrapper = shallowMount(CDMonth, {
  //   propsData: propsData,
  //   attrs: {
  //     class: 'cd-month--test'
  //   }
  // })

  const month_header = testdate.format("MMM YYYY")
  const days_in_month = testdate.daysInMonth()
  const weekday = testdate.format('dddd')
  const _x = prevMonthWeekLength(testdate.toDate())
  it (`CD-MONTH (Days amount): ${month_header} has ${days_in_month} days and starts with ${weekday}, so calendar will have ${(days_in_month + _x)} days in [days] property`, done => {
    const wrapper = mountcalendar(propsData)
    Vue.nextTick().then(() => {
      wrapper.vm.days.then(() => {
        expect(wrapper.vm.days.length).toBe((days_in_month + _x))
        done()
      })
    })
  }, 100000)
  it (`CD-MONTH (Days amount): if prependDays set true, there will be ${_x} days, where [day.isprev == true]`, done => {
    const wrapper = mountcalendar(propsData)
    Vue.nextTick().then(() => {
      wrapper.vm.days.then(() => {
        const prev_count = wrapper.vm.days.filter(f => f.isprev === true).length
        expect(prev_count).toBe(_x)
        done()
      })
    })
  }, 100000)
  it (`CD-MONTH (Days amount): if prependDays is false, there will be ${days_in_month} days in [days] property`, (done) => {
    const wrapper = mountcalendar(doNotPrepend)
    Vue.nextTick().then(() => {
      wrapper.vm.days.then(() => {
        expect(wrapper.vm.days.length).toBe(testdate.daysInMonth())
        done()
      })
    })
  }, 100000)
  it ('CD-MONTH (Weekday list): contains 7 instances <li> elements', (done) => {
    const wrapper = mountcalendar(propsData)
    Vue.nextTick().then(() => {
      const weekdays = wrapper.findAll('li')
      expect(weekdays.length).toBe(7)
      done()
    })
  }, 100000)
  it ('CD-MONTH (Weekday list): contains 7 instances of [.cd-weekday--container] class', done => {
    const wrapper = mountcalendar(propsData)
    wrapper.vm.days.then(() => {
      Vue.nextTick().then(() => {
        const weekdays = wrapper.findAll('ul')
        const cdlists = weekdays.wrappers.map(wd => wd.findAll('.cd-weekday--list').length)
        expect(cdlists.length).toBe(7)
        done()
      })
    })
    
  }, 100000)
})