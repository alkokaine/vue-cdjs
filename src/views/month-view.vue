<template>
  <div class="month">
    <el-date-picker v-model="currentdate" format="yyyy-MM-dd"></el-date-picker>
    <el-checkbox v-model="sixDays"></el-checkbox>
    <cd-month :date="currentdate" :six-days="sixDays">
      <span slot-scope="{ day }" slot="content">
        {{ day }} жопа!
      </span>
    </cd-month>
  </div>
</template>

<script>
// @ is an alias to /src
import CDMonth from '@/components/cd-month.vue'
import { DatePicker } from 'element-ui'
export default {
  name: 'MonthView',
  components: {
    'cd-month': CDMonth,
    'el-date-picker': DatePicker
  },
  data () {
    return {
      currentdate: new Date(Date.now()),
      sixDays: false
    }
  }
}
</script>
<style>
</style>
