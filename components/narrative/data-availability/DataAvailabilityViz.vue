<template>
  <div>
    <div id="data-availability-viz" class="viz-container"></div>
  </div>
</template>

<script>
import developmentGoals from '~/data/development-goals.json'

export default {
  name: 'DataAvailabilityVizComponent',

  props: {
    selectedSdg: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      developmentGoals: null,
      vizData: null,
      goalsData: null,
    }
  },

  watch: {
    selectedSdg(oldValue, newValue) {
      this.updateViz(oldValue, newValue)
    },
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
    this.vizData = this.$d3
      .rollups(
        this.vizData,
        (v) => {
          const countTrue = v.filter((d) => d.availabile === 'TRUE').length
          return { percentage: (countTrue * 100) / v.length, data: v }
        },
        (d) => d.country,
        (d) => d.sdg_code
      )
      .sort((a, b) => {
        return this.$d3.descending(
          this.$d3.median(a[1], (d) => d[1].percentage),
          this.$d3.median(b[1], (d) => d[1].percentage)
        )
      })

    this.goalsData = this.$d3.csvParse(responseGoalsDataRawText)
    this.goalsData.forEach((d) => {
      d.sdg_code = +d.sdg_code
    })

    this.drawViz(this.vizData, this.goalsData)
  },

  methods: {
    drawViz(vizData, goalsData) {
      const svgWidth = 600 // width / 1.5
      const svg = this.$d3
        .select('#data-availability-viz')
        .append('svg')
        .attr('height', svgWidth)
        .attr('width', svgWidth)

      const margin = {
        left: 30,
        right: 30,
        top: 30,
        bottom: 30,
      }

      const chartWidth = svgWidth - margin.right - margin.left
      const chartHeight = svgWidth - margin.top - margin.bottom

      const chartContainer = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
      const countryDomain = vizData.map((d) => d[0])

      const radialScale = this.$d3
        .scaleBand()
        .range([-180, 180])
        .domain(['data availability', ...countryDomain])

      const innerRadius = 50

      const yScale = this.$d3
        .scaleLinear()
        .domain([0, 100])
        .range([innerRadius, chartWidth / 2])

      const circleRadiusScale = this.$d3
        .scaleSqrt()
        .range([0, 15])
        .domain([0, 100])

      const sdgColorScale = this.$d3
        .scaleOrdinal()
        .domain(this.$d3.range(17).map((d) => d.toString()))
        .range([
          '#E5243B',
          '#DDA63A',
          '#4C9F38',
          '#C5192D',
          '#FF3A21',
          '#26BDE2',
          '#FCC30B',
          '#A21942',
          '#FD6925',
          '#DD1367',
          '#FD9D24',
          '#BF8B2E',
          '#3F7E44',
          '#0A97D9',
          '#56C02B',
          '#00689D',
          '#19486A',
        ])

      const countries = chartContainer
        .selectAll('g')
        .data(vizData)
        .join('g')
        .attr('id', (d) => {
          return d[0]
        })
        .attr('transform', (d) => {
          return `translate(${chartWidth / 2},${
            chartHeight / 2
          }) rotate(${radialScale(d[0])})`
        })

      countries
        .selectAll('circle.sdg')
        .data((d) => d[1])
        .join('circle')
        .attr('class', 'sdg')
        .attr('cx', 0)
        .attr('cy', (d) => {
          return yScale(d[1].percentage)
        })
        .attr('r', (d) => circleRadiusScale(d[1].percentage))
        .attr('fill', (d) => sdgColorScale(d[0]))
        .attr('opacity', 0.75)
        .filter(
          (d) =>
            this.selectedSdg !== 'all' && d[0] !== this.selectedSdg.toString()
        )
        .attr('opacity', 0)

      if (this.selectedSdg === 'all') {
        countries
          .selectAll('circle.mean')
          .data((d) => [d[1]])
          .join('circle')
          .attr('class', 'mean')
          .attr('cx', 0)
          .attr('cy', (d) => {
            return yScale(this.$d3.median(d, (m) => m[1].percentage))
          })
          .attr('r', 2)
      }

      if (this.selectedSdg !== 'all') {
        chartContainer
          .append('circle')
          .attr('cx', chartWidth / 2)
          .attr('cy', chartWidth / 2)
          .attr('r', yScale(this.countryMean(this.selectedSdg, this.vizData)))
          .attr('fill', 'none')
          .attr('stroke', sdgColorScale(this.selectedSdg.toString()))
          .attr('stroke-dasharray', '6,6')
          .attr('stroke-width', 2)
      }

      const yAxis = (g) =>
        g.attr('text-anchor', 'middle').call((g) =>
          g
            .selectAll('g')
            .data(yScale.ticks())
            .join('g')
            .attr('fill', 'none')
            .call((g) =>
              g.append('circle').attr('stroke', '#ccc').attr('r', yScale)
            )
            .call((g) =>
              g
                .append('text')
                .attr('y', (d) => -yScale(d))
                .attr('x', 0)
                .attr('dominant-baseline', 'middle')
                .text((d) => d + '%')
                .attr('font-size', '10px')
                .attr('font-family', 'Arial')
                .attr('fill', 'black')
                .attr('text-align', 'middle')
            )
        )

      // yAxisG
      svg
        .append('g')
        .attr('transform', `translate(${svgWidth / 2},${svgWidth / 2})`)
        .attr('id', 'yAxis')
        .call(yAxis)

      const xAxis = (g) =>
        g.call((g) =>
          g
            .selectAll('g')
            .data(radialScale.domain())
            .join('g')
            .attr(
              'transform',
              (d) => `
     rotate(${radialScale(d) + 90})`
            )
            .call((g) =>
              g
                .append('line')
                .attr('x2', chartWidth / 2)
                .attr('x1', innerRadius)
                .attr('stroke', '#ccc')
            )
            .call((g) =>
              g
                .append('text')
                .attr('dominant-baseline', 'middle')
                .attr('text-anchor', 'middle')
                .attr(
                  'transform',
                  (d) =>
                    `translate(${chartWidth / 2},0) rotate(${
                      radialScale(d) + 180 >= 270 || radialScale(d) + 180 < 90
                        ? 90
                        : -90
                    })`
                )
                .text((d) => d)
                .attr('font-size', '10px')
                .attr('font-family', 'Arial')
                .attr('fill', 'black')
            )
        )

      // xAxisG
      svg
        .append('g')
        .attr('transform', `translate(${svgWidth / 2},${svgWidth / 2})`)
        .attr('id', 'xAxis')
        .call(xAxis)
    },

    countryMean(sdg, countryGroup) {
      if (sdg !== 'all') {
        return this.$d3.median(countryGroup, (d) => {
          return d[1].filter((m) => m[0] === sdg.toString())[0][1].percentage
        })
      } else {
        return 0
      }
    },

    updateViz(oldValue, newValue) {
      const container = this.$d3.select('#data-availability-viz')
      container.selectChildren('*').remove()

      this.drawViz(this.vizData, this.goalsData)
    },
  },
}
</script>

<style lang="scss" scoped></style>
