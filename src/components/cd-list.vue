<template>
  <div class="cd-list">
    <div v-if="$slots.header" class="cd-list--header">
      <slot name="header"></slot>
    </div>
    <ul v-loading="isLoading" class="cd-list--wrap" :class="[listClass, { 'inner': isInner }]">
      <li v-if="$slots.placeholder" class="cd-list--item placeholder">
        <slot name="placeholder"></slot>
      </li>
      <li v-for="(row, index) in rows" :key="rowkey(row, index)" :id="rowkey(row, index)" :class="['cd-list--item', resolveRowClass(row, index)]">
        <slot :index="index" :row="row">
          <div class="cd-list--item-default">
            <p>index: {{ index }}</p>
            <p>row: {{ row }}</p>
          </div>
        </slot>
      </li>
    </ul>
    <div v-if="$slots.footer" class="cd-list--footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import aria from '@/common/aria.js'
const rowClassSource = (source) => {
  if (typeof source === 'function') {
    return { isfunction: true }
  } else if (typeof source === 'string') {
    return { isstring: true }
  } else if (Array.isArray(source)) {
    return { isarray: true }
  } else {
    return { isobject: true }
  }
}
export default {
  directives: {
    loading: Loading
  },
  props: {
    keyfield: { type: String },
    collection: { type: Array, required: true, description: 'Данные для списка' },
    isInner: { type: Boolean, default: false, description: 'Признак вложенного списка' },
    listClass: { type: [Array, Object, String], description: 'css-классы, которые применятся к элементу <ul>' },
    rowClass: { type: [Function, Array, Object, String], description: 'css-классы, которые применятся к элементам <li>' },
    itemRole: { type: String, default: 'none', validator: (value) => aria.validateItemRole(value) },
    listRole: { type: String, default: 'none', validator: (value) => aria.validateListRole(value) },
    isRowVisible: { type: Function }
  },
  data (list) {
    return {
      isLoading: Boolean,
      rowClassState: rowClassSource(list.rowClass)
    }
  },
  computed: {
    rowkey () {
      const list = this
      return (row, index) => `${row[list.keyfield]}_${index}`
    },
    rows () {
      const list = this
      if (list.isRowVisible !== undefined && typeof list.isRowVisible === 'function')
        return list.collection.filter((row, index) => list.isRowVisible(row, index))
      return list.collection
    },
    resolveRowClass () {
      const list = this
      return (row, index) => {
        if (list.rowClassState.isfunction) {
          return  list.rowClass(row, index)
        } else {
          return list.rowClass
        }
      }
    }
  }
}
</script>

<style>

</style>