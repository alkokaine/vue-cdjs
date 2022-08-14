import CDList from '@/components/cd-list'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
let warn = {}
const warnhandler = function warnHandler(err, vm, info) {
  warn = { err, vm, info }
}
Vue.config.warnHandler = warnhandler
import { toBeFunction } from 'jest-extended'
expect.extend({ toBeFunction })
describe('CD-LIST', () => {
  const collection = []
  const listData = {
    collection: collection,
    keyfield: 'datafield'
  }
  it ('CD-LIST: is mounted', (done) => {
    const wrapper = mount(CDList, { propsData: listData })
    const ul = wrapper.find('ul')
    expect(ul).toBeDefined()
    done()
  })
  
  it ('CD-LIST: has rows.length === 2', done => {
    const wrapper = mount(CDList, { propsData: listData })
    listData.collection.push({ datafield: 'object_id', text: 'object_id' })
    listData.collection.push({ datafield: 'building_id', text: 'building_id' })
    Vue.nextTick().then(() => {
      const li = wrapper.findAll('li')
      expect(wrapper.vm.rows.length).toBe(2)
      expect(li.length).toBe(2)
      done()
    })
  })
  const rowClassData = {
    collection: [{ datafield: 'object_id', text: 'object_id' }, { datafield: 'building_id', text: 'building_id' }, { datafield: 'parent_id', text: 'parent_id' }],
    keyfield: 'datafield',
    rowClass: 'simple-row-class'
  }
  
  it ('CD-LIST: has rowClass property', done => {
    const rc = mount(CDList, { propsData: rowClassData })
    Vue.nextTick().then(() => {
      expect(rc.vm.$props.rowClass).toBeDefined()
      done()
    })
    rc.destroy()
  }) 
  it ('CD-LIST: has 3 elements of class .simple-row-class and 4 after insert another one', done => {
    const rc = mount(CDList, { propsData: rowClassData })
    Vue.nextTick().then(() => {
      const li = rc.findAll('.simple-row-class')
      expect(li.length).toBe(3)
      rowClassData.collection.push({ datafield: 'main_id', text: 'main_id' })
      Vue.nextTick().then(() => {
        const li2 = rc.findAll('.simple-row-class')
        expect(li2.length).toBe(4)
        done()
      })
    })
  })
  const rowVisible = {
    collection: [{ datafield: 'object_id', text: 'object_id' }, { datafield: 'building_id', text: 'building_id' }, { datafield: 'parent_id', text: 'parent_id' }],
    rowClass: 'simple-row-class',
    isRowVisible: (row, index) => index % 2 == 0,
    keyfield: 'datafield'
  }
  it ('CD-LIST: has isRowVisible property and it is a function', done => {
    const wrapper = mount(CDList, { propsData: rowVisible })
    Vue.nextTick().then(() => {
      expect(wrapper.vm.$props.isRowVisible).toBeFunction()
      const li = wrapper.findAll('.simple-row-class')
      expect(li.length).toBe(2)
      expect(wrapper.vm.collection.length).toBe(rowVisible.collection.length)
      done()
    })
  })
  it ('CD-LIST: has $placeholder slot', done => {
    const wrapper = mount(CDList, { propsData: rowVisible, slots: { placeholder: '<div>im in (placeholder slot)</div>' }})
    Vue.nextTick().then(() => {
      const li = wrapper.findAll('li')
      const placeholder = wrapper.find('.placeholder')
      expect(placeholder).toBeDefined()
      expect(li.length).toBe(wrapper.vm.rows.length + 1)
      rowVisible.collection.push({ datafield: 'main_id', text: 'main_id' })
      rowVisible.collection.push({ datafield: 'owner_id', text: 'owner_id' })
      Vue.nextTick().then(() => {
        const li2 = wrapper.findAll('li')
        expect(li2.length).toBe(4)
        expect(placeholder.text()).toBe('im in (placeholder slot)')
        done()
      })
    })
  })
  it ('CD-LIST: has $header slot', done => {
    const wrapper = mount(CDList, { propsData: rowVisible, slots: { header: '<div>im in (header slot)</div>'}})
    Vue.nextTick().then(() => {
      const headerslot = wrapper.findAll('.cd-list--header')
      expect(headerslot.length).toBe(1)
      const header = wrapper.find('.cd-list--header')
      expect(header.text()).toBe('im in (header slot)')
      done()
    })
  })
  it ('CD-LIST: has $footer slot', done => {
    const wrapper = mount(CDList, { propsData: rowVisible, slots: { footer: '<div>im in (footer slot)</div>'}})
    Vue.nextTick().then(() => {
      const footerslot = wrapper.find('.cd-list--footer')
      expect(footerslot.text()).toBe('im in (footer slot)')
      done()
    })
  })
  it ('CD-LIST: has $header and $placeholder slots', done => {
    const wrapper = mount(CDList, { propsData: rowVisible, slots: { placeholder: '<div>im in (placeholder slot)</div>', header: '<div>im in (header slot)</div>'}})
    Vue.nextTick().then(() => {
      const headerslot = wrapper.find('.cd-list--header')
      const placeholder = wrapper.find('.placeholder')
      expect(headerslot.text()).toBe('im in (header slot)')
      expect(placeholder.text()).toBe('im in (placeholder slot)')
      done()
    })
  })
  it ('CD-LIST: wrong list role', done => {
    const wrapper = mount(CDList, { propsData: {
      collection: [{ datafield: 'object_id', text: 'object_id' }, { datafield: 'building_id', text: 'building_id' }, { datafield: 'parent_id', text: 'parent_id' }],
      rowClass: 'simple-row-class',
      listRole: 'foobar'
    }})
    expect(warn.err).toBeDefined()
    expect(warn.err).toBe("Invalid prop: custom validator check failed for prop \"listRole\".")
    done()
  })
  it ('CD-LIST: wrong item role', done => {
    const wrapper = mount(CDList, { propsData: {
      collection: [{ datafield: 'object_id', text: 'object_id' }, { datafield: 'building_id', text: 'building_id' }, { datafield: 'parent_id', text: 'parent_id' }],
      rowClass: 'simple-row-class',
      itemRole: 'foobar'
    }})
    expect(warn.err).toBeDefined()
    expect(warn.err).toBe("Invalid prop: custom validator check failed for prop \"itemRole\".")
    done()
  })
  it ('CD-LIST: has default scoped elements', done => {
    const wrapper = mount(CDList, { propsData: {
      collection: [{ datafield: 'object_id', text: 'object_id' }, { datafield: 'building_id', text: 'building_id' }, { datafield: 'parent_id', text: 'parent_id' }],
      rowClass: 'simple-row-class',
      itemRole: 'foobar',
      keyfield: 'datafield'
    }})
    Vue.nextTick().then(() => {
      const defaults = wrapper.findAll('.cd-list--item-default')
      expect(defaults.length).toBe(3)
      done()
    })
  })
  it ('CD-LIST: has custom scoped elements', done => {
    const scopeddata = {
      collection: [{ datafield: 'object_id', text: 'object_id' }, { datafield: 'building_id', text: 'building_id' }, { datafield: 'parent_id', text: 'parent_id' }],
      rowClass: 'simple-row-class',
      keyfield: 'datafield',
    }
    const wrapper = mount(CDList, {
      propsData: scopeddata,
      scopedSlots: {
        row: '<div class="scoped-item-class" slot-scope="row">{{ row }}foobar</div>'
      }
    })
    Vue.nextTick().then(() => {
      const defaults = wrapper.findAll('.scoped-item-class')
      expect(defaults.length).toBe(3)
      const constains = defaults.wrappers.map(d => d.text().indexOf('foobar') >= 0)
      expect(constains.every(e => e === true)).toBeTruthy()
      done()
    })
  }, 100000)
})