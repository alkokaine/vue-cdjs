<template>
  <cd-list :collection="tabList" list-role="tablist" item-role="tab" :keyfield="tabKey" :is-row-visible="isTabVisible" row-class="cd-tab-header">
    <div slot-scope="{ row }" class="cd-tab-header--wrap" :class="row.class">
      {{ row[tabCaption] }}
    </div>
    <div class="cd-tab--content" slot="footer">
      <slot></slot>
    </div>
  </cd-list>
</template>

<script>
import CDList from '@/components/cd-list.vue'
export default {
  components: {
    'cd-list': CDList
  },
  props: {
    tabList: { type: Array, required: true, description: 'Список вкладок' },
    tabKey: { type: String, default: 'name', description: 'Свойство объекта-дескриптора вкладки, содержащее идентификатор вкладки' },
    tabCaption: { type: String, default: 'caption', description: 'Свойство объекта-дескриптора вкладки, содержащее её заголовок' },
    isTabVisible: { type: Function, description: 'Функция, возвращающая true или false для вкладки tab с индексом index' }
  }
}
</script>

<style>

</style>