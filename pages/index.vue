<template>
  <div>
    <header class="position-relative bg-dark">
      <div
        class="
          position-relative
          d-flex
          flex-column
          justify-content-between
          align-items-start
          p-3 p-lg-5
          text-light
          h-100
          w-100
        "
      >
        <div class="w-100 border-bottom border-secondary h-100 header__content">
          <span class="d-block border-bottom border-secondary w-100 mb-4 pb-3">
            UNDP AND ARAB DEVELOPMENT PORTAL
          </span>

          <h1 class="display-0 fw-normal m-0 header__title">
            Data Availability and Data Gaps in the Arab Region
          </h1>

          <div class="header__background">
            <home-header-animation />
          </div>
        </div>
      </div>
    </header>

    <section
      id="scroll-into-target"
      class="bg-dark text-light d-grid p-3 p-lg-5 intro-text"
    >
      <h2>Bridging the gaps to focus on what matters the most.</h2>
      <div>
        <p class="fs-4 mb-5">
          Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
          nibh, ut fermentum massa justo sit amet risus.
        </p>
        <p class="fs-4 mb-5">
          Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p class="fs-4 mb-5">
          Etiam porta sem malesuada magna mollis euismod.<br />
          Donec sed odio dui. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor. Etiam porta sem malesuada magna mollis euismod.
          Donec sed odio dui.
        </p>
        <nuxt-link
          to="/about"
          class="
            btn
            rounded-0
            border border-light
            py-3
            px-5
            my-3
            text-reset text-decoration-none text-uppercase
          "
        >
          Read more
        </nuxt-link>
      </div>
    </section>

    <section class="bg-dark text-light p-3 p-lg-5">
      <span class="d-block w-100 border-bottom border-secondary pb-3">
        CHAPTERS
      </span>

      <nuxt-link
        to="/narratives/data-availability"
        class="
          w-100
          border-bottom border-secondary
          d-flex
          justify-content-between
          text-decoration-none text-reset
        "
      >
        <span class="d-block fs-4 py-5 me-3">
          01.Why is important to make data available in the Arab Region?
        </span>
        <img src="~/assets/images/arrow_right.svg" alt="arrow icon" />
      </nuxt-link>

      <nuxt-link
        to="/narratives/data-disaggregation"
        class="
          w-100
          border-bottom border-secondary
          d-flex
          justify-content-between
          text-decoration-none text-reset
        "
      >
        <span class="d-block fs-4 py-5 me-3">
          02.Why is it important to have disaggregated data?
        </span>
        <img src="~/assets/images/arrow_right.svg" alt="arrow icon" />
      </nuxt-link>

      <nuxt-link
        to="/narratives/data-up-to-date"
        class="
          w-100
          border-bottom border-secondary
          d-flex
          justify-content-between
          text-decoration-none text-reset
        "
      >
        <span class="d-block fs-4 py-5 me-3">
          03.Why is it important to have up-to-date statistic?
        </span>
        <img src="~/assets/images/arrow_right.svg" alt="arrow icon" />
      </nuxt-link>
    </section>
  </div>
</template>

<script>
import HomeHeaderAnimation from '~/components/homeHeaderAnimation'
// import HomeHeaderAnimation2 from '~/components/homeHeaderAnimation2'

export default {
  name: 'IndexPage',

  components: {
    HomeHeaderAnimation,
    // HomeHeaderAnimation2,
  },

  transition: 'fade',

  methods: {
    scrollDown() {
      document
        .getElementById('scroll-into-target')
        .scrollIntoView({ behavior: 'smooth' })
    },
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

.header__content * {
  position: relative;
  z-index: 10;
  /* mix-blend-mode: difference; */
}

.header__title {
  max-width: 15ch;
}

.header__background {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
}

.intro-text {
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}
</style>
