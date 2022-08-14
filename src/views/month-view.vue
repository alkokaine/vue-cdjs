<template>
  <div class="month">
    <el-date-picker v-model="currentdate" format="yyyy-MM-dd"></el-date-picker>
    <cd-month :date="currentdate"></cd-month>
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
      currentdate: new Date(Date.now())
    }
  }
}
</script>
<style>
</style>
