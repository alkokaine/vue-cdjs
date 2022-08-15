<template>
  <div class="cd-day--block">
    <div class="cd-day--header">
      <slot name="header"></slot>
    </div>
    <div class="cd-day--content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cd-day'
}
</script>

<style>
  .cd-day--block {
    cursor: pointer;
  }
  .cd-day--block:hover {
    background-color: #f1ebeb;
  }
  .cd-day--content {
    min-width: 50px;
  }
</style>