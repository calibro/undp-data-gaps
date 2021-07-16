<template>
  <div id="data-up-to-date-viz" class="viz-container">
    <div class="countryRow" :style="{ minHeight: countryRowHeight }">
      <div class="data-up-to-date-viz__row">
        <div id="data-up-to-date-viz__axis" style="grid-column: 2">
          <data-up-to-date-indicators-axis
            v-if="timeScaleDomain"
            :width="indicatorsSumWidth"
            height="20"
            :data="timeScaleDomain"
            :margins="margins"
          />
        </div>
      </div>
    </div>
    <div
      v-for="country in selectedSdgData"
      :key="country[0]"
      class="countryRow"
      :style="{ minHeight: countryRowHeight }"
    >
      <details
        :ref="`details-${country[0]}`"
        @click.prevent="(e) => expandDetails(e, country[0])"
      >
        <summary>
          <div class="data-up-to-date-viz__row">
            <div class="text-end data-up-to-date-viz__row__label">
              {{ country[0] }}
              <img
                src="~/assets/images/icons/plus--circle.svg"
                alt="Plus Icon"
                class="ms-2 data-up-to-date-viz__row__label__icon"
              />
            </div>
            <div style="cursor: initial">
              <data-up-to-date-indicators-sum
                :country="country[0]"
                :width="indicatorsSumWidth"
                height="12"
                :max="countriesMax"
                :data="country[1]"
                :margins="margins"
              />
            </div>
          </div>
        </summary>
        <div class="py-3">
          <div
            v-for="indicator in country[1]"
            :key="indicator[0]"
            class="data-up-to-date-viz__row"
          >
            <div class="text-end">{{ indicator[0] }}</div>
            <div>
              <data-up-to-date-indicators
                :width="indicatorsSumWidth"
                height="12"
                :data="indicator[1][0]"
                :margins="margins"
              />
            </div>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
import DataUpToDateIndicators from '~/components/narrative/data-up-to-date/DataUpToDateIndicators'
import DataUpToDateIndicatorsSum from '~/components/narrative/data-up-to-date/DataUpToDateIndicatorsSum'
import DataUpToDateIndicatorsAxis from '~/components/narrative/data-up-to-date/DataUpToDateIndicatorsAxis'

export default {
  name: 'DataUpToDateVizComponent',

  components: {
    DataUpToDateIndicators,
    DataUpToDateIndicatorsSum,
    DataUpToDateIndicatorsAxis,
  },

  props: {
    selectedSdg: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      countriesMax: null,
      selectedSdgData: null,
      timeScaleDomain: null,
      margins: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      indicatorsSumWidth: null,
      countryRowHeight: null,
    }
  },

  watch: {
    selectedSdg(_, newValue) {
      this.drawViz()
    },
  },

  async mounted() {
    this.getMinimumContainerDimension()

    const responseVizData = await fetch('/data/data_gaps-data-viz_3.csv')
    const responseVizDataRawText = await responseVizData.text()

    this.$options.vizData = this.$d3.csvParse(responseVizDataRawText)

    this.$options.vizData = this.$d3.rollups(
      this.$options.vizData,
      (v) => {
        return v.map((d) => {
          delete d['Country name']
          delete d.indicator_code
          return Object.entries(d).map((e) => {
            return { year: e[0], value: +e[1] }
          })
        })
      },
      (d) => d.sdg,
      (d) => d['Country name'],
      (d) => d.indicator_code
    )

    this.drawViz()

    this.$bus.$on('prepare-data-up-to-date-for-resize', this.prepareForResize)
    this.$bus.$on(
      'redraw-data-up-to-date-after-resize',
      this.getMinimumContainerDimension
    )
  },

  beforeDestroy() {
    this.$bus.$off('prepare-data-up-to-date-for-resize', this.prepareForResize)
    this.$bus.$off(
      'redraw-data-up-to-date-after-resize',
      this.getMinimumContainerDimension
    )
  },

  methods: {
    getMinimumContainerDimension() {
      const firstContainer = document.querySelector(
        '#data-up-to-date-viz__axis'
      )
      this.indicatorsSumWidth = firstContainer?.clientWidth

      const container = document.querySelector('#data-up-to-date-viz')
      this.countryRowHeight = container?.clientHeight / 23 + 'px'
    },

    drawViz() {
      this.selectedSdgData = this.$options.vizData.find(
        (el) => el[0] === this.selectedSdg
      )[1]

      this.countriesMax = this.$d3.max(this.selectedSdgData, (d) => {
        const all = this.$d3.merge(
          d[1].map((d) => {
            return d[1][0]
          })
        )
        const group = this.$d3.rollups(
          all,
          (v) => this.$d3.sum(v, (d) => d.value),
          (d) => d.year
        )

        return this.$d3.max(group, (d) => d[1])
      })

      this.timeScaleDomain = this.selectedSdgData[0][1][0][1][0].map(
        (d) => new Date(+d.year, 0, 1)
      )
    },

    prepareForResize() {
      this.indicatorsSumWidth = 0
      this.countryRowHeight = 0
    },

    expandDetails(e, detailsID) {
      if (
        e.target.classList.contains('data-up-to-date-viz__row__label') ||
        e.target.classList.contains('data-up-to-date-viz__row__label__icon') ||
        e.target.tagName === 'SUMMARY'
      ) {
        this.$refs[`details-${detailsID}`][0].toggleAttribute('open')
        this.$refs[`details-${detailsID}`][0].classList.toggle(
          'data-up-to-date-viz__row__details--expanded'
        )
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.viz-container {
  min-height: 100%;
  width: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
}

.countryRow {
  width: 100%;

  & details {
    & summary {
      list-style: none;

      &:focus {
        outline: none;

        & .data-up-to-date-viz__row__label {
          border-color: #86b7fe;
          outline: 0;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
      }
    }

    & summary::marker {
      display: none;
    }

    & summary::-webkit-details-marker {
      display: none;
    }
  }
}

.data-up-to-date-viz__row {
  display: grid;
  grid-template-columns: 2fr 10fr;
  gap: 1.5rem;
}

.data-up-to-date-viz__row__label img {
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1); /* easeOutQuint */
}

.data-up-to-date-viz__row__details--expanded
  .data-up-to-date-viz__row__label
  img {
  transform: rotate(45deg);
}
</style>
