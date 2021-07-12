<template functional>
  <section
    class="bg-dark text-light px-3 px-lg-5 py-5 py-lg-6"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <div class="d-flex" :class="[props.justifyContent]">
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
      default: 'justify-content-center',
    },
  },
}
</script>

<style lang="scss" scoped>
.break-text__text {
  max-width: 800px;
}
</style>
