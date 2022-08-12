import CDList from '@/components/cd-list'
import { shallowMount } from '@vue/test-utils'

describe('CD-LIST', () => {
  const wrapper = shallowMount(CDList)
  it ('CD-LIST: is mounted', (done) => {
    const ul = wrapper.find('ul')
    expect(ul).toBeDefined()
    done()
  })
})