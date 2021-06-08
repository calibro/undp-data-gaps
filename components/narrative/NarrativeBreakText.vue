<template>
  <section class="bg-dark text-light px-5 py-6">
    <div class="d-flex justify-content-center">
      <div class="fs-4 break-text__text">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NarrativeBreakTextComponent',
}
</script>

<style lang="scss" scoped>
.break-text__text {
  max-width: 800px;
}
</style>
