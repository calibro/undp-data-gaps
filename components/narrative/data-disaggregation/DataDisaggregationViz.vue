<template>
  <div id="data-disaggregation-viz" class="viz-container"></div>
</template>

<script>
import developmentGoals from '~/data/development-goals.json'

export default {
  name: 'DataDisaggregationVizComponent',

  props: {
    disaggregation: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      developmentGoals: null,
      vizData: null,
      // goalsData: null,
      maxIndicatorCodes: 0,
    }
  },

  watch: {
    disaggregation(oldValue, newValue) {
      this.updateViz(oldValue, newValue)
    },
  },

  async mounted() {
    this.developmentGoals = developmentGoals

    const responseVizData = await fetch(
      '/data/data_gaps-data-viz_2-ordered.csv'
    )
    const responseVizDataRawText = await responseVizData.text()

    const responseGoalsData = await fetch(
      '/data/data_gaps-data-SDG_indicators.csv'
    )
    const responseGoalsDataRawText = await responseGoalsData.text()

    this.vizData = this.$d3.csvParse(responseVizDataRawText)

    const parsedDisaggregations = []
    this.vizData.forEach((d) => {
      d.goal_code = +d.goal_code

      // Looping through dataset to find the maximum number of Indicator Codes.
      // This is used to proportionally display the Indicators on the xAxis
      if (!parsedDisaggregations.includes(d.disaggregation)) {
        const codesSet = new Set()

        this.vizData
          .filter((entry) => entry.disaggregation === d.disaggregation)
          .forEach((entry) => {
            codesSet.add(entry.indicator_code)
          })

        if (codesSet.size > this.maxIndicatorCodes) {
          this.maxIndicatorCodes = codesSet.size
        }

        parsedDisaggregations.push(d.disaggregation)
      }
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
      const container = this.$d3.select('#data-disaggregation-viz')

      const containerWidth = 100
      const containerHeight = 100

      const safeAreaMargins = {
        top: 40,
        right: 0,
        bottom: 0,
        left: 200,
      }

      /* ----------- SCALES ----------- */

      const xValue = (d) => d.indicator_code
      const yValue = (d) => d.country
      // const goalsValue = (d) => d.goal_code

      const xScale = this.$d3
        .scaleBand()
        .domain(
          vizData
            .filter((d) => d.disaggregation === this.disaggregation)
            .map(xValue)
        )
        .range([0, containerWidth])
        .paddingInner(0.3)
        .paddingOuter(0.15)
        .align(0.5)

      const yScale = this.$d3
        .scaleBand()
        .domain(vizData.map(yValue).sort())
        .range([0, containerHeight])
        .paddingInner(0.3)
        .paddingOuter(0.15)
        .align(0.5)

      // const goalsScale = this.$d3
      //   .scaleQuantize()
      //   .domain(
      //     vizData
      //       .filter((d) => d.disaggregation === this.disaggregation)
      //       .map(goalsValue)
      //   )
      //   .range([0, containerWidth])
      //   .paddingInner(0.3)
      //   .paddingOuter(0.15)
      //   .align(0.5)

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

      const xAxisSafeArea = container
        .append('div')
        .classed('x-axis-safearea', true)
        .style(
          'width',
          `calc(100% - ${safeAreaMargins.right}px - ${safeAreaMargins.left}px)`
        )

      const xAxisGroup = xAxisSafeArea
        .append('div')
        .classed('x-axis-container', true)
        .style(
          'width',
          () => (xScale.domain().length * 100) / this.maxIndicatorCodes + '%'
        )

      const axisGroupData = this.$d3.rollups(
        this.vizData.filter((d) => d.disaggregation === this.disaggregation),
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

      const rectsGroupSafeArea = container
        .append('div')
        .style('position', 'absolute')
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
        .style('position', 'absolute')
        .style(
          'width',
          (xScale.domain().length * 100) / this.maxIndicatorCodes + '%'
        )
        .style('height', '100%')

      rectsGroup
        .selectAll('div')
        .data(vizData.filter((d) => d.disaggregation === this.disaggregation))
        .enter()
        .append('div')
        .style('position', 'absolute')
        .style('left', (d) => xScale(xValue(d)) + '%')
        .style('top', (d) => yScale(yValue(d)) + '%')
        .style('width', xScale.bandwidth() + '%')
        .style('height', yScale.bandwidth() + '%')
        .attr(
          'title',
          (d) =>
            `Goal: ${d.goal_code}, Code: ${d.indicator_code}, Country: ${d.country}`
        )
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
            return this.developmentGoals.find((goal) => goal.id === d.goal_code)
              .color
          }
        })
        .style('opacity', 0)

      const t = this.$d3.transition().duration(800).ease(this.$d3.easeQuadOut)

      this.$d3
        .selectAll('.data-disaggregation-viz-rect')
        .transition(t)
        .delay(() => Math.floor(Math.random() * (500 - 0 + 1) + 0))
        .style('opacity', 1)
    },

    updateViz(oldValue, newValue) {
      const t = this.$d3.transition().duration(500).ease(this.$d3.easeQuadOut)

      this.$d3
        .selectAll('.data-disaggregation-viz-rect')
        .transition(t)
        .delay(() => Math.floor(Math.random() * (300 - 0 + 1) + 0))
        .style('opacity', 0)

      setTimeout(() => {
        const container = this.$d3.select('#data-disaggregation-viz')
        container.selectChildren('*').remove()

        this.drawViz(this.vizData, this.goalsData)
      }, 800)
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
  width: 180px;
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
  // display: flex;

  // & div {
  //   display: flex;
  //   align-items: flex-end;
  //   justify-content: center;
  //   transform: rotate(90deg);

  //   & span {
  //     // white-space: nowrap;
  //     // overflow: hidden;
  //     // text-overflow: ellipsis;
  //     writing-mode: sideways-lr;
  //   }
  // }
}
</style>
