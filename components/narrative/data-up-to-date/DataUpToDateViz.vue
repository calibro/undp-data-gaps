<template>
  <div id="data-up-to-date-viz" class="viz-container"></div>
</template>

<script>
import developmentGoals from '~/data/development-goals.json'

export default {
  name: 'DataUpToDateVizComponent',

  data() {
    return {
      developmentGoals: null,
      vizData: null,
    }
  },

  async mounted() {
    this.developmentGoals = developmentGoals

    const responseVizData = await fetch('/data/data_gaps-data-viz_3.csv')
    const responseVizDataRawText = await responseVizData.text()

    const responseGoalsData = await fetch(
      '/data/data_gaps-data-SDG_indicators.csv'
    )
    const responseGoalsDataRawText = await responseGoalsData.text()

    this.vizData = this.$d3.csvParse(responseVizDataRawText)

    // this.vizData.forEach((d) => {
    //   d.goal_code = +d.goal_code
    // })
    // this.vizData.sort(function (a, b) {
    //   return a.goal_code - b.goal_code
    // })

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
  height: 100%;
  width: 100%;
  position: relative;

  & svg {
    overflow: visible;
  }
}
</style>
