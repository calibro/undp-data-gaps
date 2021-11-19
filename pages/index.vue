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
          <div class="border-bottom border-secondary mb-4">
            <span class="d-block w-75 pb-3">
              UNDP AND ARAB DEVELOPMENT PORTAL
            </span>
          </div>

          <h1 class="display-0 fw-normal mb-5 m-lg-0 header__title">
            SDGs Data Availability and Data Gaps in the Arab Region
          </h1>

          <div class="header__background">
            <home-header-animation v-if="defer(2)" />
          </div>
        </div>
      </div>
    </header>

    <section
      id="scroll-into-target"
      class="bg-dark text-light d-lg-grid p-3 p-lg-5 intro-text"
    >
      <h2 class="pb-5 pb-lg-0">
        Putting a spotlight on data gaps to mobilize collective action and
        support.
      </h2>
      <div>
        <p class="fs-4 mb-4 mb-lg-5">
          In September 2015, the Heads of State and Government and High
          Representatives decided on new global Sustainable Development Goals
          (SDGs). The 17 SDGs and 169 targets which have been adopted
          demonstrate the scale and ambition of the 2030 Agenda for Sustainable
          Development. They are integrated and indivisible and balance the three
          dimensions of sustainable development: the economic, social and
          environmental. But to measure progress and ensure that no one is left
          behind, the availability of high-quality, accessible, timely and
          reliable data that is disaggregated by income, gender, age, race,
          ethnicity, disability, geographic location and other characteristics
          relevant to countries is key.
        </p>
        <p class="fs-4 mb-4 mb-lg-5">
          In July 2017, the UN General Assembly adopted a global indicator
          framework to monitor this Agenda. The 232 global indicators are
          complemented by indicators at the regional and national levels as
          developed by Member States. Data from national statistical and data
          systems are the basis for the compilation of these global indicators.
        </p>
        <p class="fs-4 mb-4 mb-lg-5">
          The SDGs Data Availability and Data Gaps in the Arab Region dashboard
          aims to stimulate an informed dialogue on the state of SDGs data. By
          offering a proxy assessment of a country’s statistical capacity, it
          aims to bring together different data communities of producers and
          users to explore how best to harness the power of technology and
          innovative tools to fulfill the data demands of this Agenda and ensure
          that no one is left behind. Refer to the methodology note for more
          information on how data availability has been measured in this
          endeavour.
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
            btn-read-more
          "
        >
          Read more
        </nuxt-link>
      </div>
    </section>

    <section class="bg-dark text-light p-3 pb-5 p-lg-5">
      <span class="d-block w-100 border-bottom border-secondary pb-3">
        CHAPTERS
      </span>

      <nuxt-link
        to="/data-availability"
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
        <img src="~/assets/images/icons/arrow_right.svg" alt="arrow icon" />
      </nuxt-link>

      <nuxt-link
        to="/data-disaggregation"
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
        <img src="~/assets/images/icons/arrow_right.svg" alt="arrow icon" />
      </nuxt-link>

      <nuxt-link
        to="/data-up-to-date"
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
        <img src="~/assets/images/icons/arrow_right.svg" alt="arrow icon" />
      </nuxt-link>
    </section>
  </div>
</template>

<script>
import Defer from '~/mixins/defer.mixin.js'
import HomeHeaderAnimation from '~/components/homeHeaderAnimation'

export default {
  name: 'IndexPage',

  components: {
    HomeHeaderAnimation,
  },

  mixins: [Defer()],

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

@include media-breakpoint-down(lg) {
  .btn-read-more {
    width: 100%;
  }
}
</style>
