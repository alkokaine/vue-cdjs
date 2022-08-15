<template>
  <div class="cd-day--block">
    <div class="cd-day--header">
      <div class="cd-day--number">{{ date }}</div>
    </div>
    <div class="cd-day--content">
      <slot></slot>
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
  .cd-day--block {
    cursor: pointer;
  }
</style>