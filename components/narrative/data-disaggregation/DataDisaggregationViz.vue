<template>
  <div class="viz-container">
    <svg id="data-disaggregation-viz" width="100%" height="100%"></svg>
  </div>
</template>

<script>
import developmentGoals from '~/data/development-goals.json'

export default {
  name: 'DataDisaggregationVizComponent',

  data() {
    return {
      developmentGoals: null,
      vizData: null,
      goalsData: null,
      disaggregation: 'Sex',
    }
  },

  async mounted() {
    this.developmentGoals = developmentGoals

    const responseVizData = await fetch('/data/data_gaps-data-viz_2.csv')
    const responseVizDataRawText = await responseVizData.text()

    const responseGoalsData = await fetch(
      '/data/data_gaps-data-SDG_indicators.csv'
    )
    const responseGoalsDataRawText = await responseGoalsData.text()

    this.vizData = this.$d3.csvParse(responseVizDataRawText)
    this.vizData.forEach((d) => {
      d.goal_code = +d.goal_code
    })
    this.vizData.sort(function (a, b) {
      return a.goal_code - b.goal_code
    })

    this.goalsData = this.$d3.csvParse(responseGoalsDataRawText)
    this.goalsData.forEach((d) => {
      d.sdg_code = +d.sdg_code
    })

    this.drawViz(this.vizData, this.goalsData)
  },

  methods: {
    drawViz(vizData, goalsData) {
      const svg = this.$d3.select('#data-disaggregation-viz')

      const containerWidth = 100
      const containerHeight = 100

      // const safeAreaMargins = {
      //   top: 40,
      //   right: 0,
      //   bottom: 0,
      //   left: 120,
      // }

      const rectsGroup = svg
        .append('g')
        .style('position', 'relative')
        .attr('width', containerHeight + '%')
        .attr('height', containerHeight + '%')

      /* ----------- SCALES ----------- */

      const xValue = (d) => d.indicator_code
      const yValue = (d) => d.country

      const xScale = this.$d3
        .scaleBand()
        .domain(
          vizData
            .filter((d) => d.disaggregation === this.disaggregation)
            .map(xValue)
        )
        .range([0, containerWidth])
        .paddingInner(0.3)

      const yScale = this.$d3
        .scaleBand()
        .domain(vizData.map(yValue).sort())
        .range([0, containerHeight])
        .paddingInner(0.3)

      // console.log(xScale.domain())
      // console.log(xScale.range())
      // console.log(yScale.domain())
      // console.log(yScale.range())

      /* ----------- RECTS ----------- */

      rectsGroup
        .selectAll('rect')
        .data(vizData.filter((d) => d.disaggregation === this.disaggregation))
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(xValue(d)) + '%')
        .attr('y', (d) => yScale(yValue(d)) + '%')
        .attr('width', xScale.bandwidth() + '%')
        .attr('height', yScale.bandwidth() + '%')
        .attr('class', (d) => {
          if (d.availability === '0.5') {
            return 'data-disaggregation-viz-rect data-disaggregation-viz-rect--masked'
          } else {
            return 'data-disaggregation-viz-rect'
          }
        })
        .attr('fill', (d) => {
          if (d.availability === '0') {
            return 'none'
          } else {
            return this.developmentGoals.find((goal) => goal.id === d.goal_code)
              .color
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.viz-container {
  height: 100%;
  position: relative;

  & svg {
    overflow: visible;
  }
}
</style>

<style lang="scss">
.data-disaggregation-viz-rect {
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 2px;
}

.data-disaggregation-viz-rect--masked {
  mask-image: url(~/assets/images/narrative/data-disaggregation/cuts-mask.svg);
  mask-repeat: no-repeat;
  mask-size: cover;
  mask-type: luminance;
}
</style>
