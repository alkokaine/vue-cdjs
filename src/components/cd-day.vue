<template>
  <div class="cd-day--block">
    <div class="cd-day--header">
      <div class="cd-day--number">{{ date.getDate() }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: { type: Date, required: true }
  }
}
</script>

<style>

</style>