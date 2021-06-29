<template>
  <div>
    <h1>viz</h1>
  </div>
</template>

<script>
import developmentGoals from '~/data/development-goals.json'

export default {
  name: 'DataAvailabilityVizComponent',

  data() {
    return {
      developmentGoals: null,
      vizData: null,
      goalsData: null,
      maxIndicatorCodes: 0,
    }
  },

  async mounted() {
    this.developmentGoals = developmentGoals

    const responseVizData = await fetch('/data/data_gaps-data-viz_1.csv')
    const responseVizDataRawText = await responseVizData.text()

    const responseGoalsData = await fetch(
      '/data/data_gaps-data-SDG_indicators.csv'
    )
    const responseGoalsDataRawText = await responseGoalsData.text()

    this.vizData = this.$d3.csvParse(responseVizDataRawText)

    this.goalsData = this.$d3.csvParse(responseGoalsDataRawText)
    this.goalsData.forEach((d) => {
      d.sdg_code = +d.sdg_code
    })

    this.drawViz(this.vizData, this.goalsData)
  },

  methods: {
    drawViz(vizData, goalsData) {},
  },
}
</script>

<style lang="scss" scoped></style>
