<template>
  <div class="cd-list">
    <slot name="header"></slot>
    <ul v-loading="isLoading" class="cd-list--wrap" :class="[listClass, { 'inner': isInner }]">
      <li v-for="(row, index) in rows" :key="rowkey(row, index)" class="cd-list--item" :class="[resolveRowClass(row, index)]"></li>
    </ul>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import { validateItemRole, validateListRole } from '@/common/aria.js'
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
    itemRole: { type: String, validator: validateItemRole },
    listRole: { type: String, validator: validateListRole }
  },
  data (list) {
    return {
      isLoading: Boolean,
      rows: list.isRowVisible
        ? (list.collection.filter((row, index) => list.isRowVisible(row, index)))
        : list.collection
    }
  },
  computed: {
    rowkey () {
      const list = this
      return (row, index) => `${row[list.keyfield]}_${index}`
    }
  }
}
</script>

<style>

</style>