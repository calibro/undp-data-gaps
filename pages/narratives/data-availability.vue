<template>
  <div>
    <narrative-header
      chapter-number="1"
      title="Why is important to make data available in the Arab Region?"
      scroll-into-element-id="scroll-into-target"
    >
      <div class="narrative-header__image"></div>
    </narrative-header>

    <narrative-break-text id="scroll-into-target">
      <p class="fs-4 mb-5">
        Data is everywhere. It helps us understand the complex phenomena that
        happen around us and it helps us framing problems and taking the right
        decisions. Citizens, organizations, companies, governments are both data
        producers and data consumers.
      </p>
      <p class="fs-4 mb-5">
        Their decisions are shaped by the information they receive. The data
        collected about them shape the perception of their struggles and their
        needs. By having access to data and effectively using knowledge
        resources, individuals, firms, and communities can improve their
        individual and collective well-being, thereby contributing to
        sustainable development.
      </p>
    </narrative-break-text>

    <mq-layout mq="xxl+">
      <data-availability-scrollytelling />
    </mq-layout>
    <mq-layout :mq="['sm', 'md', 'lg', 'xl']">
      <data-availability-scrollytelling-mobile />
    </mq-layout>

    <narrative-break-text>
      <p class="fs-4 mb-5">
        By monitoring data availabitlyand bridging the gaps we can focus on what
        matters the most to the society living in the arab reagion.
      </p>
      <p class="fs-4 mb-5">
        Explore the interactive visualization to discover gaps and see how
        countries are performing.
      </p>
    </narrative-break-text>

    <section class="bg-dark text-light vh-100 data-viz">
      <div class="border-top border-bottom border-secondary data-viz__header">
        <h2 class="px-5 py-4 m-0 border-end border-secondary">
          Data availability in the Arab Region
        </h2>
        <span class="p-3 text-uppercase text-secondary d-flex align-items-end">
          Sustainable Development Goals
        </span>
      </div>

      <div class="overflow-hidden data-viz__content">
        <div
          class="
            p-3
            border-end border-secondary
            overflow-hidden
            position-relative
          "
        >
          <div
            id="data-availability-viz-container"
            ref="dataAvailabilityVizContainer"
          >
            <data-availability-viz
              :selected-sdg="selectedSdg"
              :container-width="minimumContainerDimension"
            />
          </div>
        </div>
        <aside class="data-viz__controls">
          <div
            v-for="goal in $goals"
            :key="goal.id"
            class="
              p-3
              border-bottom border-secondary
              d-flex
              align-items-center
              justify-content-between
              data-viz__controls__filter
            "
            :class="{
              'data-viz__controls__filter--active':
                selectedSdg === String(goal.id) || selectedSdg === 'all',
            }"
            @click="changeSelectedSdg(goal.id)"
          >
            <div
              class="
                d-flex
                align-items-center
                data-viz__controls__filter__label
              "
            >
              <div
                class="me-3 data-viz__controls__filter__circle"
                :style="{ background: goal.color }"
              ></div>
              <span>{{ goal.id }}. {{ goal.title }}</span>
            </div>
            <img
              class="h-100 w-auto"
              :src="
                require(`~/assets/images/sdg-icons/sdg_icon-${goal.id}.svg`)
              "
              :alt="goal.title + '| UDNP'"
            />
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script>
import NarrativeHeader from '~/components/narrative/NarrativeHeader'
import NarrativeBreakText from '~/components/narrative/NarrativeBreakText'
import DataAvailabilityScrollytelling from '~/components/narrative/data-availability/DataAvailabilityScrollytelling'
import DataAvailabilityScrollytellingMobile from '~/components/narrative/data-availability/DataAvailabilityScrollytellingMobile'
import DataAvailabilityViz from '~/components/narrative/data-availability/DataAvailabilityViz'

export default {
  name: 'DataAvailabilityPage',

  components: {
    NarrativeHeader,
    NarrativeBreakText,
    DataAvailabilityScrollytelling,
    DataAvailabilityScrollytellingMobile,
    DataAvailabilityViz,
  },

  transition: 'fade',

  data() {
    return {
      selectedSdg: 'all',
      minimumContainerDimension: 0,
      resizeTimeout: null,
    }
  },

  mounted() {
    this.getMinimumContainerDimension()

    window.addEventListener('resize', this.saveVizFromResize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.saveVizFromResize)
  },

  methods: {
    getMinimumContainerDimension() {
      const container = this.$refs.dataAvailabilityVizContainer
      const width = container.offsetWidth
      const height = container.offsetHeight

      if (width <= height) {
        this.minimumContainerDimension = width
        return width
      } else {
        this.minimumContainerDimension = height
        return height
      }
    },

    saveVizFromResize() {
      this.$refs.dataAvailabilityVizContainer.classList.add(
        'data-availability-viz-container--wait-for-resize'
      )

      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(this.resumeFromResize, 1000)
    },

    resumeFromResize() {
      this.$refs.dataAvailabilityVizContainer.classList.remove(
        'data-availability-viz-container--wait-for-resize'
      )

      this.getMinimumContainerDimension()
    },

    changeSelectedSdg(goalID) {
      if (this.selectedSdg === String(goalID)) {
        this.selectedSdg = 'all'
      } else {
        this.selectedSdg = String(goalID)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.narrative-header__image {
  height: 100%;
  width: 100%;
  background-image: url('~assets/images/narrative/data-availability/header-test.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.data-viz {
  display: grid;
  grid-template-rows: min-content 1fr;
}

.data-viz__header {
  display: grid;
  grid-template-columns: 2.5fr 1fr;
}

.data-viz__content {
  display: grid;
  grid-template-columns: 2.5fr 1fr;

  & #data-availability-viz-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 600ms ease-out;
  }

  & .data-availability-viz-container--wait-for-resize {
    filter: blur(10px);
    opacity: 0.5;
    will-change: transform;
  }

  & .data-viz__controls {
    overflow-y: scroll;

    & .data-viz__controls__filter {
      height: 70px;
      cursor: pointer;

      & * {
        opacity: 0.6;
        transition: opacity 400ms ease-in-out;
      }

      & .data-viz__controls__filter__label {
        overflow: hidden;

        & .data-viz__controls__filter__circle {
          height: 14px;
          width: 14px;
          border-radius: 50%;
        }

        & span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    & .data-viz__controls__filter--active {
      & * {
        opacity: 1;
      }
    }
  }
}
</style>
