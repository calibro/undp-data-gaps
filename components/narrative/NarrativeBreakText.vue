<template>
  <section class="bg-dark text-light px-3 px-lg-5 py-5 py-lg-6">
    <div
      class="d-flex"
      :class="{
        'justify-content-start': justifyContent === 'start',
        'justify-content-center': justifyContent === 'center',
        'justify-content-end': justifyContent === 'end',
      }"
    >
      <div class="break-text__text">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NarrativeBreakTextComponent',

  props: {
    justifyContent: {
      type: String,
      required: false,
      default: 'center',
    },
  },
}
</script>

<style lang="scss" scoped>
.break-text__text {
  max-width: 800px;
}
</style>
