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

    this.$bus.$on(
      'close-data-availability-viz-details',
      this.removeDetailsActiveStatus
    )
  },

  beforeDestroy() {
    this.$bus.$off(
      'close-data-availability-viz-details',
      this.removeDetailsActiveStatus
    )
  },

  methods: {
    drawViz(vizData, goalsData) {
      const svgWidth = this.containerWidth

      const svg = this.$d3
        .select(this.$refs.mainDiv)
        .select('svg')
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

      let xAxisG = svg
        .select('#xAxis')
        .attr('transform', `translate(${svgWidth / 2},${svgWidth / 2})`)

      if (xAxisG.empty()) {
        xAxisG = svg
          .append('g')
          .attr('transform', `translate(${svgWidth / 2},${svgWidth / 2})`)
          .attr('id', 'xAxis')
      }

      let yAxisG = svg
        .select('#yAxis')
        .attr('transform', `translate(${svgWidth / 2},${svgWidth / 2})`)

      if (yAxisG.empty()) {
        yAxisG = svg
          .append('g')
          .attr('transform', `translate(${svgWidth / 2},${svgWidth / 2})`)
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
        .attr('transform', (d) => {
          return `translate(${chartWidth / 2},${
            chartHeight / 2
          }) rotate(${radialScale(d[0])})`
        })

      let circles = countries.selectAll('circle.sdg').data(
        (d) => d[1],
        (d) => 'd_' + d[0]
      )

      const circlesEnter = circles
        .enter()
        .append('circle')
        .attr('class', 'sdg data-availability-circle')
        .attr('cx', 0)
        .attr('cy', (d) => {
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
        .on('click', (e, d) => {
          if (
            e.target.classList.contains(
              'data-availability-viz-details__selected-element'
            )
          ) {
            this.$bus.$emit('close-data-availability-viz-details')
            return
          }

          this.showCircleDetails(
            Math.round(d[1].percentage),
            goalsData.find((el) => el.sdg_code === d[0]).sdg_label,
            d[1].data
          )

          document
            .querySelector('.data-availability-viz-details__selected-element')
            ?.classList.remove(
              'data-availability-viz-details__selected-element'
            )

          this.$refs.mainDiv.classList.add(
            'data-availability-viz-details--active'
          )
          e.target.classList.add(
            'data-availability-viz-details__selected-element'
          )
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
        .attr('cy', (d) => {
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
      //   .attr('stroke-dasharray', '3,3')

      const sgdMean =
        this.selectedSdg !== 'all'
          ? [this.countryMean(this.selectedSdg, this.$options.vizData)]
          : []

      chartContainer
        .selectAll('circle.sdgMean')
        .data(sgdMean)
        .join(
          (enter) =>
            enter
              .append('circle')
              .attr('class', 'sdgMean')
              .attr('r', (d) => yScale(d))
              .attr('stroke', sdgColorScale(this.selectedSdg.toString())),
          (update) =>
            update
              .transition()
              .attr('r', (d) => yScale(d))
              .attr('stroke', sdgColorScale(this.selectedSdg.toString()))
              .selection(),
          (exit) => exit.remove()
        )
        .attr('cx', chartWidth / 2)
        .attr('cy', chartWidth / 2)
        .attr('fill', 'none')
        .attr('stroke-dasharray', '6,6')
        .attr('stroke-width', 1)

      chartContainer
        .selectAll('text.sdgMean')
        .data(sgdMean)
        .join(
          (enter) =>
            enter
              .append('text')
              .attr('class', 'sdgMean')
              .attr('y', (d) => chartWidth / 2 - yScale(d))
              .attr('fill', sdgColorScale(this.selectedSdg.toString()))
              .text((d) => 'SDG MEDIAN ' + Math.round(d) + '%'),
          (update) =>
            update
              .transition()
              .attr('y', (d) => chartWidth / 2 - yScale(d))
              .attr('fill', sdgColorScale(this.selectedSdg.toString()))
              .text((d) => 'SDG MEDIAN ' + Math.round(d) + '%')
              .selection(),
          (exit) => exit.remove()
        )
        .attr('x', chartWidth / 2)
        .attr('dy', -5)
        .attr('text-anchor', 'middle')
        .attr('font-size', '9px')

      const arc = this.$d3
        .arc()
        .startAngle((radialScale.bandwidth() * Math.PI) / 180)
        .endAngle(Math.PI * 2 - (radialScale.bandwidth() * Math.PI) / 180)

      const yAxis = (g) => {
        const tickGroup = g
          .selectAll('g')
          .data(yScale.ticks(5))
          .join(
            (enter) => {
              return enter
                .append('g')
                .call((tg) =>
                  tg
                    .append('path')
                    .attr('d', (d) => {
                      return arc({
                        innerRadius: yScale(d) - 1,
                        outerRadius: yScale(d),
                      })
                    })
                    .attr('stroke', 'none')
                    .attr('fill', '#2b2a2a')
                )
                .call((tg) =>
                  tg
                    .append('text')
                    .attr('y', (d) => -yScale(d))
                    .attr('x', 0)
                    .attr('dominant-baseline', 'middle')
                    .attr('font-size', '10px')
                    .attr('font-family', 'Arial')
                    .attr('fill', 'white')
                    .attr('opacity', 0.3)
                    .attr('text-anchor', 'middle')
                    .text((d) => d + '%')
                    .call((text) => {
                      return text
                        .clone(true)
                        .each(function () {
                          this.parentNode.insertBefore(
                            this,
                            this.previousSibling
                          )
                        })
                        .attr('fill', 'none')
                        .attr('stroke', '#0b1418')
                        .attr('stroke-width', 6)
                        .attr('stroke-linejoin', 'round')
                        .attr('opacity', 1)
                    })
                )
            },
            (update) => {
              return update
                .call((tg) =>
                  tg.selectAll('path').attr('d', (d) => {
                    return arc({
                      innerRadius: yScale(d) - 1,
                      outerRadius: yScale(d),
                    })
                  })
                )
                .call((tg) => tg.selectAll('text').attr('y', (d) => -yScale(d)))
            }
          )

        return tickGroup
      }

      yAxisG.call(yAxis)

      const xAxis = (g) => {
        const tickGoup = g
          .selectAll('g')
          .data(radialScale.domain())
          .join(
            (enter) =>
              enter
                .append('g')
                .attr(
                  'transform',
                  (d) => `
       rotate(${radialScale(d) + 90})`
                )
                .call((tg) =>
                  tg
                    .call((g) =>
                      g
                        .append('line')
                        .attr('x2', chartWidth / 2)
                        .attr('x1', innerRadius)
                        .attr('stroke', '#2b2a2a')
                    )
                    .call((g) =>
                      g
                        .append('text')
                        .attr('text-anchor', 'middle')
                        .attr(
                          'transform',
                          (d) =>
                            `translate(${chartWidth / 2 + 15},0) rotate(${
                              radialScale(d) + 180 >= 270 ||
                              radialScale(d) + 180 < 90
                                ? 90
                                : -90
                            })`
                        )
                        .attr('font-size', '10px')
                        .attr('font-family', 'Arial')
                        .attr('fill', 'white')
                        .attr('opacity', (d) =>
                          d === 'data availability' ? 0.3 : 1
                        )
                        .text((d) => d.toUpperCase())
                    )
                ),
            (update) =>
              update.call((tg) =>
                tg
                  .call((g) => g.select('line').attr('x2', chartWidth / 2))
                  .call((g) =>
                    g
                      .select('text')

                      .attr(
                        'transform',
                        (d) =>
                          `translate(${chartWidth / 2 + 15},0) rotate(${
                            radialScale(d) + 180 >= 270 ||
                            radialScale(d) + 180 < 90
                              ? 90
                              : -90
                          })`
                      )
                  )
              )
          )
        return tickGoup
      }

      xAxisG.call(xAxis)
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

    showCircleDetails(percentage, label, data) {
      this.$bus.$emit('present-data-availability-viz-details', {
        percentage,
        label,
        data,
        goalsData: this.$options.goalsData,
      })
    },

    removeDetailsActiveStatus() {
      document
        .querySelector('.data-availability-viz-details__selected-element')
        ?.classList.remove('data-availability-viz-details__selected-element')

      this.$refs.mainDiv.classList.remove(
        'data-availability-viz-details--active'
      )
    },
  },
}
</script>

<style lang="scss">
.data-availability-circle {
  transition: opacity 500ms cubic-bezier(0.23, 1, 0.32, 1); /* easeOutQuint */
  cursor: pointer;
}

#chartContainer:hover .data-availability-circle {
  opacity: 0.15;
}

#chartContainer:hover .data-availability-circle:hover {
  opacity: 1;
  stroke: white;
  stroke-width: 2px;
}

.data-availability-viz-details--active .data-availability-circle {
  opacity: 0.15;
}
.data-availability-viz-details--active
  .data-availability-viz-details__selected-element {
  opacity: 1;
  stroke: white;
  stroke-width: 2px;
}
</style>
