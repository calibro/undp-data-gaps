<template>
  <svg ref="mainSVG" :height="height" :width="width" class="overflow-visible">
    <g
      class="gContainer"
      :transform="`translate(${margins.left},${margins.top})`"
    ></g>
  </svg>
</template>

<script>
import tippy from 'tippy.js'

export default {
  name: 'DataUpToDateVizIndicators',

  props: [
    'height',
    'width',
    'data',
    'max',
    'margins',
    'color',
    'country',
    'indicator',
    'indicatorLabel',
  ],

  watch: {
    height() {
      this.drawIndicators()
    },
    width() {
      this.drawIndicators()
    },
    data() {
      this.drawIndicators()
    },
  },

  mounted() {
    this.drawIndicators()
  },

  methods: {
    drawIndicators() {
      const chartWidth = this.width - this.margins.left - this.margins.right
      const chartHeight = this.height - this.margins.top - this.margins.bottom

      const xScaleDomain = this.$d3.extent(
        this.data.map((d) => new Date(d[0], 0, 1))
      )

      const xScale = this.$d3
        .scaleTime()
        .domain(xScaleDomain)
        .range([0, chartWidth])

      const radiusScale = this.$d3
        .scaleSqrt()
        .domain([0, 1, this.max])
        .range([0, 3, chartHeight])

      const line = this.$d3
        .line()
        .defined((d) => d[1] !== 0)
        .x((d) => xScale(new Date(d[0], 0, 1)))
        .y(chartHeight / 2)

      const svg = this.$d3.select(this.$refs.mainSVG).select('.gContainer')

      svg
        .selectAll('.lineMissing')
        .data([this.data.filter(line.defined())])
        .join('path')
        .attr('class', 'lineMissing')
        .attr('stroke', this.color)
        .attr('stroke-dasharray', '3,3')
        .attr('stroke-width', '0.5')
        .attr('d', line)

      svg
        .selectAll('.line')
        .data([this.data])
        .join('path')
        .attr('class', 'line')
        .attr('stroke', this.color)
        .attr('d', line)

      const color = this.color
      const country = this.country
      const indicator = this.indicator
      const indicatorLabel = this.indicatorLabel

      svg
        .selectAll('.dot')
        .data(this.data.filter((d) => d[1] !== 0))
        .join('circle')
        .attr('class', 'dot')
        .attr('cy', chartHeight / 2)
        .attr('cx', (d) => xScale(new Date(d[0], 0, 1)))
        .attr('fill', this.color)
        .attr('stroke', '#0b1418')
        .attr('r', (d) => radiusScale(d[1]))
        .each(function (d) {
          /* ----------- TOOLTIPS ----------- */
          tippy(this, {
            content(reference) {
              return `
                    <div class="d-flex flex-column">
                      <span style="color: ${color}">${indicator} - ${indicatorLabel}</span>
                      <span>${d[0]} - ${country}</span>
                      <span>Data points available: <strong>${d[1]}</strong></span>
                    </div>
                  `
            },
            allowHTML: true,
            placement: 'auto',
            delay: [300, null],
          })
        })
    },
  },
}
</script>
