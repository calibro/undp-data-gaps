<template>
  <div id="data-up-to-date-viz" class="viz-container">
    <div class="countryRow" :style="{ minHeight: countryRowHeight }">
      <div class="row">
        <div class="offset-2 col-10">
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
      v-for="country in vizData"
      :key="country[0]"
      class="countryRow"
      :style="{ minHeight: countryRowHeight }"
    >
      <details>
        <summary>
          <div class="row">
            <div class="col-2 text-end">{{ country[0] }}</div>
            <div class="col-10">
              <data-up-to-date-indicators-sum
                :width="indicatorsSumWidth"
                height="12"
                :max="countriesMax"
                :data="country[1]"
                :margins="margins"
              />
            </div>
          </div>
        </summary>
        <div v-for="indicator in country[1]" :key="indicator[0]" class="row">
          <div class="col-2 text-end">{{ indicator[0] }}</div>
          <div class="col-10">
            <data-up-to-date-indicators
              :width="indicatorsSumWidth"
              height="12"
              :data="indicator[1][0]"
              :margins="margins"
            />
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
import developmentGoals from '~/data/development-goals.json'
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

  data() {
    return {
      developmentGoals: null,
      vizData: null,
      countriesMax: null,
      timeScaleDomain: null,
      margins: {
        top: 0,
        bottom: 0,
        left: 10,
        right: 10,
      },
      indicatorsSumWidth: null,
      countryRowHeight: null,
    }
  },

  async mounted() {
    const firstContainer = document.querySelector('.countryRow .col-10')
    this.indicatorsSumWidth = firstContainer?.clientWidth

    const container = document.querySelector('#data-up-to-date-viz')
    this.countryRowHeight = container?.clientHeight / 23 + 'px'

    this.developmentGoals = developmentGoals

    const responseVizData = await fetch('/data/data_gaps-data-viz_3.csv')
    const responseVizDataRawText = await responseVizData.text()

    const responseGoalsData = await fetch(
      '/data/data_gaps-data-SDG_indicators.csv'
    )
    const responseGoalsDataRawText = await responseGoalsData.text()

    this.vizData = this.$d3.csvParse(responseVizDataRawText)

    this.vizData = this.$d3.rollups(
      this.vizData,
      (v) => {
        return v.map((d) => {
          delete d['Country name']
          delete d.indicator_code
          return Object.entries(d).map((e) => {
            return { year: e[0], value: +e[1] }
          })
        })
      },
      (d) => d['Country name'],
      (d) => d.indicator_code
    )

    this.countriesMax = this.$d3.max(this.vizData, (d) => {
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

    this.timeScaleDomain = this.vizData[0][1][0][1][0].map(
      (d) => new Date(+d.year, 0, 1)
    )

    this.goalsData = this.$d3.csvParse(responseGoalsDataRawText)
    this.goalsData.forEach((d) => {
      d.sdg_code = +d.sdg_code
    })

    this.drawViz(this.vizData, this.goalsData)
  },

  methods: {
    drawViz(vizData, goalsData) {},

    updateViz(oldValue, newValue) {},
  },
}
</script>

<style lang="scss" scoped>
.viz-container {
  min-height: 100%;
  width: 100%;
  position: relative;
  /* overflow-y: auto; */
  /* display: flex;
  flex-direction: column; */

  display: flex;
  flex-direction: column;
  /* grid-auto-rows: minmax(calc(100% / 23), max-content); */
}

.countryRow {
  width: 100%;
  /* height: max-content; */
  /* flex-grow: 1;
  flex-shrink: 1; */

  /* & .row {
    min-height: calc(100% / 23);
  } */

  & details {
    & summary {
      list-style: none;
    }

    & summary::marker {
      display: none;
    }

    & summary::-webkit-details-marker {
      display: none;
    }
  }
}
</style>
