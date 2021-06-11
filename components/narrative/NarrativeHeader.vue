<template>
  <header class="position-relative vh-100">
    <div
      class="
        d-flex
        flex-column
        justify-content-between
        align-items-start
        p-5
        text-light
        h-100
      "
    >
      <div class="header__title">
        <span class="d-block border-bottom border-light mb-4 pb-3">
          CHAPTER {{ chapterNumber }}
        </span>

        <h1 class="display-2">{{ title }}</h1>
      </div>

      <button
        class="btn btn-link p-0 text-light text-decoration-none"
        @click="scrollDown"
      >
        <!-- TODO: Add Scroll Down icon -->
        Scroll down
      </button>
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

  methods: {
    scrollDown() {
      if (this.scrollIntoElementId) {
        document
          .getElementById(this.scrollIntoElementId)
          .scrollIntoView({ behavior: 'smooth' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.header__title {
  max-width: 700px;
}

.header__background {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -999;
}
</style>
