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
      <client-only>
        <data-availability-scrollytelling v-if="defer(2)" />
      </client-only>
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

    <mq-layout mq="xxl+">
      <section
        class="
          bg-dark
          text-light
          vh-100
          position-relative
          overflow-hidden
          data-viz
        "
      >
        <div class="border-top border-bottom border-secondary data-viz__header">
          <h2 class="px-5 py-4 m-0 border-end border-secondary">
            Data availability in the Arab Region
          </h2>
          <span
            class="p-3 text-uppercase text-secondary d-flex align-items-end"
          >
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
                v-if="defer(3)"
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
                  selectedSdg === String(goal.id),
                'data-viz__controls__filter--active-all': selectedSdg === 'all',
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

        <data-availability-viz-details />
      </section>
    </mq-layout>
    <mq-layout :mq="['sm', 'md', 'lg', 'xl']">
      <section
        class="
          bg-dark
          text-light
          w-100
          position-relative
          overflow-hidden
          data-viz
        "
      >
        <div
          class="
            border-top border-secondary
            px-3 px-lg-5
            py-4
            d-flex
            flex-column
          "
        >
          <h2 class="mb-4">Data availability in the Arab Region</h2>
          <div class="select-container-mobile">
            <label for="select-element">SDG</label>
            <select
              id="select-element"
              v-model="selectedSdg"
              class="form-select"
              name="sdg"
            >
              <option value="all">All</option>
              <option
                v-for="goal in $goals"
                :key="goal.id"
                :value="goal.id.toString()"
              >
                {{ goal.id }}. {{ goal.title }}
              </option>
            </select>
          </div>
        </div>

        <div class="w-100 overflow-scroll">
          <div class="px-3 px-lg-5 py-1 py-lg-5">
            <div ref="dataAvailabilityVizContainer">
              <data-availability-viz-mobile
                v-if="defer(3)"
                :selected-sdg="selectedSdg"
                :container-width="minimumContainerDimension"
              />
            </div>
          </div>
        </div>
      </section>
    </mq-layout>
  </div>
</template>

<script>
import Defer from '~/mixins/defer.mixin.js'

import NarrativeHeader from '~/components/narrative/NarrativeHeader'
import NarrativeBreakText from '~/components/narrative/NarrativeBreakText'
import DataAvailabilityScrollytelling from '~/components/narrative/data-availability/DataAvailabilityScrollytelling'
import DataAvailabilityScrollytellingMobile from '~/components/narrative/data-availability/DataAvailabilityScrollytellingMobile'
import DataAvailabilityViz from '~/components/narrative/data-availability/DataAvailabilityViz'
import DataAvailabilityVizDetails from '~/components/narrative/data-availability/DataAvailabilityVizDetails'
import DataAvailabilityVizMobile from '~/components/narrative/data-availability/DataAvailabilityVizMobile'

export default {
  name: 'DataAvailabilityPage',

  components: {
    NarrativeHeader,
    NarrativeBreakText,
    DataAvailabilityScrollytelling,
    DataAvailabilityScrollytellingMobile,
    DataAvailabilityViz,
    DataAvailabilityVizDetails,
    DataAvailabilityVizMobile,
  },

  mixins: [Defer()],

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

      // Return if it's mobile version
      if (!container) {
        return
      }

      const width = container.offsetWidth
      const height = container.offsetHeight
      this.minimumContainerDimension = Math.min(width, height)
      return Math.min(width, height)
    },

    saveVizFromResize() {
      // Return if it's mobile version
      if (!this.$refs.dataAvailabilityVizContainer) {
        return
      }

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
  background-image: url('~assets/images/narrative/data-availability/data-availability-header.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top right;
}

.data-viz {
  display: grid;
  grid-template-rows: min-content 1fr;
}

.data-viz__header {
  display: grid;
  grid-template-columns: 2.5fr 1fr;
}

.select-container-mobile {
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  gap: 15px;
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
        transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1); /* easeOutQuint */
      }

      & .data-viz__controls__filter__label {
        overflow: hidden;

        & .data-viz__controls__filter__circle {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          box-sizing: border-box;
        }

        & span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    & .data-viz__controls__filter:hover {
      & * {
        opacity: 1;
      }

      & .data-viz__controls__filter__circle {
        border: solid 2px white;
      }
    }

    & .data-viz__controls__filter--active {
      & * {
        opacity: 1;
      }

      & .data-viz__controls__filter__circle {
        border: solid 2px white;
      }
    }

    & .data-viz__controls__filter--active-all {
      & * {
        opacity: 1;
      }
    }
  }
}
</style>
