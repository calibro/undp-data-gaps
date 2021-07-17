<template>
  <div id="data-disaggregation-viz" class="viz-container"></div>
</template>

<script>
import tippy from 'tippy.js'

export default {
  name: 'DataDisaggregationVizComponent',

  props: {
    disaggregation: {
      type: String,
      required: true,
    },
  },

  watch: {
    disaggregation(oldValue, newValue) {
      this.updateViz(oldValue, newValue)
    },
  },

  async mounted() {
    this.$options.maxIndicatorCodes = 0

    const responseVizData = await fetch('/data/data_gaps-data-viz_2.csv')
    const responseVizDataRawText = await responseVizData.text()

    const responseGoalsData = await fetch(
      '/data/data_gaps-data-SDG_indicators.csv'
    )
    const responseGoalsDataRawText = await responseGoalsData.text()

    this.$options.vizData = this.$d3.csvParse(responseVizDataRawText)

    const parsedDisaggregations = []
    this.$options.vizData.forEach((d) => {
      d.goal_code = +d.goal_code

      // Looping through dataset to find the maximum number of Indicator Codes.
      // This is used to proportionally display the Indicators on the xAxis
      if (!parsedDisaggregations.includes(d.disaggregation)) {
        const codesSet = new Set()

        this.$options.vizData
          .filter((entry) => entry.disaggregation === d.disaggregation)
          .forEach((entry) => {
            codesSet.add(entry.indicator_code)
          })

        if (codesSet.size > this.$options.maxIndicatorCodes) {
          this.$options.maxIndicatorCodes = codesSet.size
        }

        parsedDisaggregations.push(d.disaggregation)
      }
    })
    this.$options.vizData.sort(function (a, b) {
      return a.goal_code - b.goal_code
    })

    this.$options.goalsData = this.$d3.csvParse(responseGoalsDataRawText)
    this.$options.goalsData.forEach((d) => {
      d.sdg_code = +d.sdg_code
    })

    this.drawViz({ firstDraw: true })
  },

  methods: {
    async drawViz({ firstDraw }) {
      const xValues = await this.$worker.computeXValues(
        this.$options.vizData,
        this.disaggregation,
        'indicator_code'
      )
      const yValues = await this.$worker.computeYValues(
        this.$options.vizData,
        'country'
      )
      const rectsValues = await this.$worker.computeRectsValues(
        this.$options.vizData,
        this.disaggregation
      )

      const container = this.$d3.select('#data-disaggregation-viz')

      const containerWidth = 100
      const containerHeight = 100

      const safeAreaMargins = {
        top: 40,
        right: 0,
        bottom: 0,
        left: 125,
      }

      /* ----------- SCALES ----------- */

      const xScale = this.$d3
        .scaleBand()
        .domain(xValues)
        .range([0, containerWidth])
        .paddingInner(0.3)
        .paddingOuter(0.15)
        .align(0.5)

      const yScale = this.$d3
        .scaleBand()
        // .domain(vizData.map(yValue).sort())
        .domain(yValues)
        .range([0, containerHeight])
        .paddingInner(0.3)
        .paddingOuter(0.15)
        .align(0.5)

      if (firstDraw) {
        this.drawImmutables(
          container,
          safeAreaMargins,
          yScale,
          xValues,
          yValues,
          rectsValues,
          this.$options.goalsData
        )
      }

      this.drawMutables(
        container,
        safeAreaMargins,
        yScale,
        xScale,
        xValues,
        yValues,
        rectsValues,
        this.$options.goalsData
      )
    },

    drawImmutables(
      container,
      safeAreaMargins,
      yScale,
      xValues,
      yValues,
      rectsValues,
      goalsData
    ) {
      /* ----------- TABLE ROWS (Alternating colors) ----------- */

      const tableRowsGroup = container
        .append('div')
        .style('position', 'absolute')
        .style('width', '100%')
        .style(
          'height',
          `calc(100% - ${safeAreaMargins.top}px - ${safeAreaMargins.bottom}px)`
        )
        .style('bottom', 0)

      yScale.domain().forEach((d, index) => {
        tableRowsGroup
          .append('div')
          .style('position', 'absolute')
          .style('top', () => {
            return yScale.step() * index + '%'
          })
          .style('width', '100%')
          .style('height', `calc(100% / ${yScale.domain().length})`)
          .style('background-color', () => {
            if (index % 2 === 0) {
              return 'none'
            } else {
              return '#0F1D23'
            }
          })
      })

      /* ----------- AXIS ----------- */

      const yAxisGroup = container
        .append('div')
        .classed('y-axis-container', true)
        .style(
          'height',
          `calc(100% - ${safeAreaMargins.top}px - ${safeAreaMargins.bottom}px)`
        )

      yAxisGroup
        .selectAll('span')
        .data(yScale.domain())
        .enter()
        .append('div')
        .style('height', `calc(100% / ${yScale.domain().length})`)
        .append('span')
        .text((d) => {
          return d
        })
    },

    drawMutables(
      container,
      safeAreaMargins,
      yScale,
      xScale,
      xValues,
      yValues,
      rectsValues,
      goalsData
    ) {
      /* ----------- AXIS ----------- */

      const xAxisSafeArea = container
        .append('div')
        .classed('x-axis-safearea', true)
        .classed('viz-mutable', true)
        .style(
          'width',
          `calc(100% - ${safeAreaMargins.right}px - ${safeAreaMargins.left}px)`
        )

      const xAxisGroup = xAxisSafeArea
        .append('div')
        .classed('x-axis-container', true)
        .style('opacity', 0)
        .style(
          'width',
          () =>
            (xScale.domain().length * 100) / this.$options.maxIndicatorCodes +
            '%'
        )

      const axisGroupData = this.$d3.rollups(
        rectsValues,
        (v) => v.length,
        (d) => d.goal_code,
        (d) => d.indicator_code
      )

      xAxisGroup
        .selectAll('div')
        .data(axisGroupData)
        .enter()
        .append('div')
        .style('position', 'absolute')
        .style('left', (d) => {
          return xScale(d[1][0][0]) + '%'
        })
        .style('border-bottom', '1px solid #ccc')
        .style(
          'width',
          (d) =>
            xScale.step() * d[1].length -
            (xScale.step() - xScale.bandwidth()) +
            '%'
        )
        .style('height', '100%')
        .style('display', 'flex')
        .style('justify-content', 'center')
        .style('align-items', 'flex-end')
        .append('h6')
        .attr('class', 'text-white-50 mb-1')
        .text((d) => d[0])

      /* ----------- RECTS ----------- */

      const xValue = (d) => d.indicator_code
      const yValue = (d) => d.country

      const rectsGroupSafeArea = container
        .append('div')
        .style('position', 'absolute')
        .classed('viz-mutable', true)
        .style('z-index', 10)
        .style(
          'width',
          `calc(100% - ${safeAreaMargins.right}px - ${safeAreaMargins.left}px)`
        )
        .style(
          'height',
          `calc(100% - ${safeAreaMargins.top}px - ${safeAreaMargins.bottom}px)`
        )
        .style('right', 0)
        .style('bottom', 0)

      const rectsGroup = rectsGroupSafeArea
        .append('div')
        .classed('rects-container', true)
        .style('position', 'absolute')
        .style(
          'width',
          (xScale.domain().length * 100) / this.$options.maxIndicatorCodes + '%'
        )
        .style('height', '100%')
        .style('opacity', 0)

      rectsGroup
        .selectAll('div')
        .data(rectsValues)
        .enter()
        .append('div')
        .style('position', 'absolute')
        .style('left', (d) => xScale(xValue(d)) + '%')
        .style('top', (d) => yScale(yValue(d)) + '%')
        .style('width', xScale.bandwidth() + '%')
        .style('height', yScale.bandwidth() + '%')
        .attr('class', (d) => {
          if (d.availability === '0.5') {
            return 'data-disaggregation-viz-rect data-disaggregation-viz-rect--masked'
          } else {
            return 'data-disaggregation-viz-rect'
          }
        })
        .style('background-color', (d) => {
          if (d.availability === '0') {
            return 'none'
          } else {
            return this.$goals.find((goal) => goal.id === d.goal_code).color
          }
        })
        .attr('data-disaggregation', this.disaggregation)
        .attr(
          'data-color',
          (d) => this.$goals.find((goal) => goal.id === d.goal_code).color
        )
        .each(function (d) {
          /* ----------- TOOLTIPS ----------- */
          tippy(this, {
            content(reference) {
              let availabilityStatus
              let disaggregationStatus

              switch (d.availability) {
                case '0':
                  availabilityStatus = 'No'
                  disaggregationStatus = 'No'
                  break
                case '0.5':
                  availabilityStatus = 'Yes'
                  disaggregationStatus = 'No'
                  break
                case '1':
                  availabilityStatus = 'Yes'
                  disaggregationStatus = 'Yes'
                  break
              }

              const indicatorLabel = goalsData.find(
                (el) => el.indicator_code === d.indicator_code
              )?.indicator_label

              return `
                <div class="d-flex flex-column">
                  <span style="color: ${reference.dataset.color}">${d.indicator_code} - ${indicatorLabel}</span>
                  <span><strong>Availability: ${availabilityStatus}</strong></span>
                  <span><strong>${reference.dataset.disaggregation} disaggregation: ${disaggregationStatus}</strong></span>
                </div>
              `
            },
            allowHTML: true,
            placement: 'auto',
            delay: [300, null],
          })
        })

      /* ----------- ANIMATIONS ----------- */

      const t = this.$d3.transition().duration(800).ease(this.$d3.easeQuadOut)

      this.$d3.select('.x-axis-container').transition(t).style('opacity', 1)
      this.$d3.select('.rects-container').transition(t).style('opacity', 1)
    },

    updateViz(oldValue, newValue) {
      /* ----------- ANIMATIONS ----------- */

      const t = this.$d3.transition().duration(400).ease(this.$d3.easeQuadOut)

      this.$d3
        .selectAll('.viz-mutable')
        .transition(t)
        .style('opacity', 0)
        .on('end', function () {
          this.remove()
        })

      setTimeout(() => {
        this.drawViz({ firstDraw: false })
      }, 500)
    },
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

<style lang="scss">
.data-disaggregation-viz-rect {
  border: solid 1px rgb(64, 64, 64);
}

.data-disaggregation-viz-rect--masked {
  background-image: url(~/assets/images/narrative/data-disaggregation/cuts-mask.svg);
  background-repeat: no-repeat;
  background-size: cover;
}

.y-axis-container {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 110px;
  height: 100%;

  & div {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      direction: rtl;
    }
  }
}

.x-axis-safearea {
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
}

.x-axis-container {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
</style>
