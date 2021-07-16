<template>
  <div>
    <narrative-header
      chapter-number="3"
      title="Why is it important to have up-to-date statistic?"
      scroll-into-element-id="scroll-into-target"
    >
      <div class="narrative-header__image"></div>
    </narrative-header>

    <narrative-break-text id="scroll-into-target">
      <p class="fs-4 mb-5">
        Solving comple social, economical and enviromental issues require a deep
        understanding of multiple factors. Data without context is not
        information and doesn’t provide a clear picture of what’s happening
        around us.
      </p>
    </narrative-break-text>

    <mq-layout mq="xxl+">
      <client-only>
        <data-up-to-date-scrollytelling v-if="defer(2)" />
      </client-only>
    </mq-layout>
    <mq-layout :mq="['sm', 'md', 'lg', 'xl']">
      <data-up-to-date-scrollytelling-mobile />
    </mq-layout>

    <narrative-break-text>
      <p class="fs-4 mb-5">
        Explore the visualization to understand which countries and which
        indicators are more updated and their temporal granularity.
      </p>
    </narrative-break-text>

    <mq-layout mq="xxl+">
      <section class="bg-dark text-light data-viz">
        <div
          class="
            border-top border-bottom border-secondary
            px-5
            py-4
            d-flex
            justify-content-between
          "
        >
          <h2 class="m-0">Number of data points per year</h2>
          <div class="select-container">
            <label for="select-element">SDG</label>
            <select
              id="select-element"
              v-model="selectedSdg"
              class="form-select"
              name="sdg"
            >
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
        <div class="my-4 mx-5" ref="dataUpToDateVizContainer">
          <data-up-to-date-viz v-if="defer(3)" :selected-sdg="selectedSdg" />
        </div>
      </section>
    </mq-layout>
  </div>
</template>

<script>
import Defer from '~/mixins/defer.mixin.js'

import NarrativeHeader from '~/components/narrative/NarrativeHeader'
import NarrativeBreakText from '~/components/narrative/NarrativeBreakText'
import DataUpToDateScrollytelling from '~/components/narrative/data-up-to-date/DataUpToDateScrollytelling'
import DataUpToDateScrollytellingMobile from '~/components/narrative/data-up-to-date/DataUpToDateScrollytellingMobile'
import DataUpToDateViz from '~/components/narrative/data-up-to-date/DataUpToDateViz'

export default {
  name: 'DataUpToDatePage',

  components: {
    NarrativeHeader,
    NarrativeBreakText,
    DataUpToDateScrollytelling,
    DataUpToDateScrollytellingMobile,
    DataUpToDateViz,
  },

  mixins: [Defer()],

  transition: 'fade',

  data() {
    return {
      selectedSdg: '1',
    }
  },

  mounted() {
    window.addEventListener('resize', this.saveVizFromResize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.saveVizFromResize)
  },

  methods: {
    saveVizFromResize() {
      this.$refs.dataUpToDateVizContainer.classList.add(
        'data-up-to-date-viz-container--wait-for-resize'
      )
      this.$bus.$emit('prepare-data-up-to-date-for-resize')

      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(this.resumeFromResize, 1000)
    },

    resumeFromResize() {
      this.$bus.$emit('redraw-data-up-to-date-after-resize')

      this.$refs.dataUpToDateVizContainer.classList.remove(
        'data-up-to-date-viz-container--wait-for-resize'
      )

      this.getMinimumContainerDimension()
    },
  },
}
</script>

<style lang="scss" scoped>
.narrative-header__image {
  height: 100%;
  width: 100%;
  background-image: url('~assets/images/narrative/data-up-to-date/data-up-to-date-header.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top right;
}

.data-viz {
  display: grid;
  grid-template-rows: min-content 1fr;
  min-height: 100vh;
}

.select-container {
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  gap: 15px;
}

.data-up-to-date-viz-container--wait-for-resize {
  opacity: 0;
}
</style>
