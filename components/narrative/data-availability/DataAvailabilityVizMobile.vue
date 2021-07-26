<template>
  <div id="data-availability-viz" ref="mainDiv">
    <svg></svg>
  </div>
</template>

<script>
import tippy from 'tippy.js'

export default {
  name: 'DataAvailabilityVizComponent',

  props: {
    selectedSdg: {
      type: String,
      required: true,
    },
    containerWidth: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      vizReady: false,
    }
  },

  watch: {
    selectedSdg(oldValue, newValue) {
      this.updateViz()
    },

    containerWidth() {
      if (this.vizReady) {
        this.updateViz()
      }
    },
  },

  async mounted() {
    const responseVizData = await fetch('/data/data_gaps-data-viz_1.csv')
    const responseVizDataRawText = await responseVizData.text()

    const responseGoalsData = await fetch(
      '/data/data_gaps-data-SDG_indicators.csv'
    )
    const responseGoalsDataRawText = await responseGoalsData.text()

    this.$options.vizData = this.$d3.csvParse(responseVizDataRawText)
    this.$options.vizData = this.$d3
      .rollups(
        this.$options.vizData,
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

    this.$options.goalsData = this.$d3.csvParse(responseGoalsDataRawText)

    this.vizReady = true

    this.drawViz(this.$options.vizData, this.$options.goalsData)
  },

  methods: {
    drawViz(vizData, goalsData) {
      const margin = {
        left: 0,
        right: 0,
        top: 35,
        bottom: 15,
      }

      const countryHeight = 60
      const countryDomain = vizData.map((d) => d[0])
      const svgWidth = this.containerWidth

      const svgHeight =
        countryDomain.length * countryHeight + margin.top + margin.bottom

      const svg = this.$d3
        .select(this.$refs.mainDiv)
        .select('svg')
        .attr('height', svgHeight)
        .attr('width', svgWidth)

      const chartWidth = svgWidth - margin.right - margin.left
      const chartHeight = countryDomain.length * countryHeight

      const cirlceMaxRadius = 10

      const yScale = this.$d3
        .scaleLinear()
        .domain([0, 100])
        .range([cirlceMaxRadius, chartWidth - cirlceMaxRadius])

      const circleRadiusScale = this.$d3
        .scaleSqrt()
        .range([0, cirlceMaxRadius])
        .domain([0, 100])

      const sdgColorScale = this.$d3
        .scaleOrdinal()
        .domain(this.$d3.range(17).map((d) => (d + 1).toString()))
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

      let yAxisG = svg
        .select('#yAxis')
        .attr('transform', `translate(${margin.left},${margin.top - 5})`)

      if (yAxisG.empty()) {
        yAxisG = svg
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top - 5})`)

          .attr('id', 'yAxis')
      }

      let chartContainer = svg.select('#chartContainer')

      if (chartContainer.empty()) {
        chartContainer = svg
          .append('g')
          .attr('id', 'chartContainer')
          .attr('transform', `translate(${margin.left},${margin.top})`)
      }

      const countries = chartContainer
        .selectAll('g')
        .data(vizData, (d) => d[0])
        .join('g')
        .attr('id', (d) => {
          return d[0]
        })
        .attr('transform', (d, i) => {
          return `translate(0,${countryHeight * i})`
        })

      countries
        .selectAll('rect')
        .data((d, i) => [[i, d[0]]])
        .join('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', countryHeight)
        .attr('width', chartWidth)
        .attr('fill', (d) => (d[0] % 2 ? 'none' : '#0F1D23'))

      countries
        .selectAll('text')
        .data((d, i) => [d])
        .join('text')
        .attr('x', 5)
        .attr('y', 5)
        .attr('fill', 'white')
        .attr('font-size', '9px')
        .attr('dominant-baseline', 'hanging')
        .text((d) => d[0])

      let circles = countries.selectAll('circle.sdg').data(
        (d) => d[1],
        (d) => 'd_' + d[0]
      )

      const circlesEnter = circles
        .enter()
        .append('circle')
        .attr('class', 'sdg data-availability-circle')
        .attr('cy', countryHeight / 2)
        .attr('cx', (d) => {
          return yScale(d[1].percentage)
        })
        .attr('r', (d) => circleRadiusScale(d[1].percentage))
        .attr('fill', (d) => sdgColorScale(d[0]))
        .attr('opacity', 0)
        .each(function (d) {
          /* ----------- TOOLTIPS ----------- */
          tippy(this, {
            content(reference) {
              const goalCode = d[0]
              const color = reference.getAttribute('fill')
              const percentage = Math.round(d[1].percentage)
              const sdgLabel = goalsData.find(
                (el) => el.sdg_code === goalCode
              ).sdg_label

              return `
                <div class="d-flex flex-column">
                  <span style="color: ${color}">SDG ${goalCode} - ${sdgLabel}</span>
                  <span><small>DATA AVAILABILITY: </small><strong>${percentage}%</strong></span>
                </div>
              `
            },
            allowHTML: true,
            placement: 'auto',
            delay: [300, null],
          })
        })

      circles = circles.merge(circlesEnter)

      circles
        .transition()
        .attr('opacity', (d) => {
          return this.selectedSdg !== 'all' &&
            d[0] !== this.selectedSdg.toString()
            ? 0
            : 0.75
        })
        .attr('display', (d) => {
          return this.selectedSdg !== 'all' &&
            d[0] !== this.selectedSdg.toString()
            ? 'none'
            : 'initial'
        })
        .attr('cx', (d) => {
          return yScale(d[1].percentage)
        })

      // countries
      //   .selectAll('line.mean')
      //   .data((d) => [d[1]])
      //   .join(
      //     (enter) =>
      //       enter
      //         .append('line')
      //         .attr('class', 'mean')
      //         .attr('opacity', (d) => {
      //           return this.selectedSdg === 'all' ? 1 : 0
      //         })
      //         .attr('x1', -18)
      //         .attr('y1', (d) => {
      //           return yScale(this.$d3.median(d, (m) => m[1].percentage))
      //         })
      //         .attr('x2', 18)
      //         .attr('y2', (d) => {
      //           return yScale(this.$d3.median(d, (m) => m[1].percentage))
      //         }),
      //     (update) =>
      //       update
      //         .transition()
      //         .attr('y1', (d) => {
      //           return yScale(this.$d3.median(d, (m) => m[1].percentage))
      //         })
      //         .attr('y2', (d) => {
      //           return yScale(this.$d3.median(d, (m) => m[1].percentage))
      //         })
      //         .attr('opacity', (d) => {
      //           return this.selectedSdg === 'all' ? 1 : 0
      //         })
      //         .selection()
      //   )
      //   .attr('stroke', 'white')

      const sgdMean =
        this.selectedSdg !== 'all'
          ? [this.countryMean(this.selectedSdg, this.$options.vizData)]
          : []

      chartContainer
        .selectAll('line.sdgMean')
        .data(sgdMean)
        .join(
          (enter) =>
            enter
              .append('line')
              .attr('class', 'sdgMean')
              .attr('x1', (d) => yScale(d))
              .attr('x2', (d) => yScale(d))
              .attr('stroke', sdgColorScale(this.selectedSdg.toString())),
          (update) =>
            update
              .transition()
              .attr('x1', (d) => yScale(d))
              .attr('x2', (d) => yScale(d))
              .attr('stroke', sdgColorScale(this.selectedSdg.toString()))
              .selection(),
          (exit) => exit.remove()
        )
        .attr('y1', 0)
        .attr('y2', chartHeight)
        .attr('stroke-dasharray', '6,6')
        .attr('stroke-width', 1)

      chartContainer
        .selectAll('text.sdgMean')
        .data(sgdMean)
        .join(
          (enter) =>
            enter
              .append('text')
              .attr('class', 'sdgMean labelOutline')
              .attr('x', (d) => yScale(d))
              .attr('fill', sdgColorScale(this.selectedSdg.toString()))
              .text((d) => 'SDG MEDIAN ' + Math.round(d) + '%'),
          (update) =>
            update
              .transition()
              .attr('x', (d) => yScale(d))
              .attr('fill', sdgColorScale(this.selectedSdg.toString()))
              .text((d) => 'SDG MEDIAN ' + Math.round(d) + '%')
              .selection(),
          (exit) => exit.remove()
        )
        .attr('y', 0)
        .attr('dy', -10)
        .attr('text-anchor', 'middle')
        .attr('font-size', '9px')

      yAxisG
        .call(
          this.$d3
            .axisTop(yScale)
            .tickSize(0)
            .tickPadding(5)
            .ticks(5)
            .tickFormat((d) => d + '%')
        )
        .call((g) => {
          let text = g.select('text')

          if (text.empty()) {
            text = g.append('text')
          }

          text
            .attr('x', chartWidth / 2)
            .attr('y', -20)
            .attr('text-anchor', 'middle')
            .attr('font-size', '9px')
            .attr('fill', 'white')
            .text('DATA AVAILABILITY')

          return g.attr('opacity', 0.3)
        })
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

    updateViz() {
      this.drawViz(this.$options.vizData, this.$options.goalsData)
    },
  },
}
</script>

<style lang="scss">
.labelOutline {
  stroke-width: 6px;
  paint-order: stroke;
  stroke: #0b1418;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
