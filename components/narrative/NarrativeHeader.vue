<template functional>
  <header class="position-relative bg-dark">
    <div
      class="
        d-flex
        flex-column
        justify-content-between
        align-items-start
        p-3 p-lg-5
        text-light
        h-100
        header__content
      "
    >
      <div class="header__title">
        <span class="d-block border-bottom border-light mb-4 pb-3">
          CHAPTER {{ props.chapterNumber }}
        </span>

        <h1 class="display-2 fw-normal">{{ props.title }}</h1>
      </div>

      <mq-layout mq="xl+">
        <button
          class="btn btn-link p-0 text-light text-decoration-none"
          @click="$options.scrollDown(props.scrollIntoElementId)"
        >
          <!-- TODO: Add Scroll Down icon -->
          Scroll down
        </button>
      </mq-layout>
    </div>

    <div class="header__background">
      <slot></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NarrativeHeaderComponent',

  props: {
    chapterNumber: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    scrollIntoElementId: {
      type: String,
      required: true,
    },
  },

  scrollDown(scrollIntoElementId) {
    if (scrollIntoElementId) {
      document
        .getElementById(scrollIntoElementId)
        .scrollIntoView({ behavior: 'smooth' })
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  overflow: hidden;

  @include media-breakpoint-up(lg) {
    height: 100vh;
  }
}

.header__content {
  position: relative;
  z-index: 10;
}

.header__title {
  max-width: 700px;
}

.header__background {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style>
