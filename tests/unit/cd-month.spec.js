import { createDate } from '@/common/month-days'
import { shallowMount } from '@vue/test-utils'
import CDMonth from '@/components/cd-month'

describe('cd-month', () => {
  const testdate = createDate(2022, 8, 1)
  const propsData = {
    date: testdate.toDate(),
  }
  const wrapper = shallowMount(CDMonth, {
    propsData: propsData,
    attrs: {
      class: 'cd-month--test'
    }
  })
  it ('cd-month mounted', () => {
    expect(wrapper.classes()).toContain('cd-month')
  })
})
