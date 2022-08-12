import { createDate, prevMonthWeekLength } from '@/common/month-days'
import { shallowMount } from '@vue/test-utils'
import CDMonth from '@/components/cd-month'

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

  const wrapper = shallowMount(CDMonth, {
    propsData: propsData,
    attrs: {
      class: 'cd-month--test'
    }
  })

  const month_header = testdate.format("MMM YYYY")
  const days_in_month = testdate.daysInMonth()
  const weekday = testdate.format('dddd')
  const _x = prevMonthWeekLength(testdate.toDate())
  it (`Days amount: ${month_header} has ${days_in_month} days and starts with ${weekday}, so calendar will have ${(days_in_month + _x)} days in [days] property`, done => {
    wrapper.vm.days.then((response) => {
      expect(wrapper.vm.days.length).toBe((days_in_month + _x))
      done()
    })
  }, 100000)
  it (`Days amount: if prependDays set true, there will be ${_x} days, where [day.isprev == true]`, done => {
    try {
      wrapper.vm.days.then(() => {
        const prev_count = (wrapper.vm.days.filter(f => f.isprev === true)).length
        expect(prev_count).toBe(_x)
        done()
      })
    } catch (error) {
      let prev_count = (wrapper.vm.days.filter(f => f.isprev === true)).length
      expect(prev_count).toBe(_x)
      done()
    }
  }, 100000)
  it (`Days amount: if prependDays is false, there will be ${days_in_month} days in [days] property`, (done) => {
    const notPrepend = shallowMount(CDMonth, { propsData: doNotPrepend })
    notPrepend.vm.days.then(() => {
      expect(notPrepend.vm.days.length).toBe(testdate.daysInMonth())
      done()
    })
  }, 100000)
  it (`Weekday list: cd-month has a property weekdays.length === 7`, () => {
    expect(wrapper.vm.weekdays.length).toBe(7)
  })
})