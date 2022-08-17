import { mount } from '@vue/test-utils'
import CDTabs from '@/components/cd-tabs'
import Vue from 'vue'
const tablist = [
  {
    name: 'tab1',
    caption: 'tab-1',
    content: 'content-tab-1'
  },
  {
    name: 'tab2',
    caption: 'tab-2',
    content: 'content-tab-2',
    class: 'tab2-class'
  },
  {
    name: 'tab3',
    caption: 'tab-3',
    content: 'content-tab-3'
  }
]

describe('renders cd-tabs', () => {
  it ('has .cd-tabs class', (done) => {
    const wrapper = mount(CDTabs, { propsData: { 'tab-list': tablist }})
    Vue.nextTick().then(() => {
      expect(wrapper.find('.cd-tabs')).toBeDefined()
      expect(wrapper.find('.cd-tab--content')).toBeDefined()
      expect(wrapper.findAll('.cd-tab-header').length).toBe(tablist.length)
      expect(wrapper.findAll('.cd-tab-header--wrap').length).toBe(tablist.length)
      expect(wrapper.findAll('.tab2-class').length).toBe(1)
      done()
    })
  }, 10000)
})