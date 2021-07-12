<template>
  <div>
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
          w-100
          header__content
        "
      >
        <div class="w-100 header__title">
          <span class="d-block border-bottom border-light mb-4 pb-3">
            ABOUT THE PROJECT
          </span>

          <h1 class="display-2 fw-normal">About</h1>
        </div>
      </div>
    </header>

    <narrative-break-text justify-content="justify-content-start">
      <h5 class="text-uppercase">Small title</h5>
      <p class="fs-4 mb-5">
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec id
        elit non mi porta gravida at eget metus. Curabitur blandit tempus
        porttitor. Etiam porta sem malesuada magna mollis euismod. Nullam id
        dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus
        porttitor. Integer posuere erat a ante venenatis dapibus posuere velit
        aliquet. Etiam porta sem malesuada magna mollis euismod. Maecenas sed
        diam eget risus varius blandit sit amet non magna. Nulla vitae elit
        libero, a pharetra augue. Curabitur blandit tempus porttitor. Vestibulum
        id ligula porta felis euismod semper. Nulla vitae elit libero, a
        pharetra augue. Donec ullamcorper nulla non metus auctor fringilla.
      </p>
      <p class="fs-4 mb-5">
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec id
        elit non mi porta gravida at eget metus. Curabitur blandit tempus
        porttitor. Etiam porta sem malesuada magna mollis euismod. Nullam id
        dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus
        porttitor. Integer posuere erat a ante venenatis dapibus posuere velit
        aliquet. Etiam porta sem malesuada magna mollis euismod. Maecenas sed
        diam eget risus varius blandit sit amet non magna. Nulla vitae elit
        libero, a pharetra augue. Curabitur blandit tempus porttitor. Vestibulum
        id ligula porta felis euismod semper. Nulla vitae elit libero, a
        pharetra augue. Donec ullamcorper nulla non metus auctor fringilla.
      </p>
      <h5 class="text-uppercase">Small title</h5>
      <p class="fs-4 mb-5">
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec id
        elit non mi porta gravida at eget metus. Curabitur blandit tempus
        porttitor. Etiam porta sem malesuada magna mollis euismod. Nullam id
        dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus
        porttitor. Integer posuere erat a ante venenatis dapibus posuere velit
        aliquet. Etiam porta sem malesuada magna mollis euismod. Maecenas sed
        diam eget risus varius blandit sit amet non magna. Nulla vitae elit
        libero, a pharetra augue. Curabitur blandit tempus porttitor. Vestibulum
        id ligula porta felis euismod semper. Nulla vitae elit libero, a
        pharetra augue. Donec ullamcorper nulla non metus auctor fringilla.
      </p>
      <p class="fs-4 mb-5">
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec id
        elit non mi porta gravida at eget metus. Curabitur blandit tempus
        porttitor. Etiam porta sem malesuada magna mollis euismod. Nullam id
        dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus
        porttitor. Integer posuere erat a ante venenatis dapibus posuere velit
        aliquet. Etiam porta sem malesuada magna mollis euismod. Maecenas sed
        diam eget risus varius blandit sit amet non magna. Nulla vitae elit
        libero, a pharetra augue. Curabitur blandit tempus porttitor. Vestibulum
        id ligula porta felis euismod semper. Nulla vitae elit libero, a
        pharetra augue. Donec ullamcorper nulla non metus auctor fringilla.
      </p>
    </narrative-break-text>
  </div>
</template>

<script>
import NarrativeBreakText from '~/components/narrative/NarrativeBreakText'

export default {
  name: 'AboutPage',

  transition: 'fade',

  components: {
    NarrativeBreakText,
  },
}
</script>

<style lang="scss" scoped>
header {
  overflow: hidden;

  /* @include media-breakpoint-up(lg) {
    height: 100vh;
  } */
}

.header__content {
  position: relative;
  z-index: 10;
}

.header__title {
  max-width: 700px;
}

.break-text__text {
  max-width: 800px;
}
</style>
