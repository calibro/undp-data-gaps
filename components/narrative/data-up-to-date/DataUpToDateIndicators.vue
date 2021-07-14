<template>
  <svg ref="mainSVG" :height="height" :width="width">
    <g
      class="gContainer"
      :transform="`translate(${margins.left},${margins.top})`"
    ></g>
  </svg>
</template>

<script>
export default {
  name: 'DataUpToDateVizIndicators',

  props: ['height', 'width', 'data', 'margins'],

  watch: {
    height() {
      this.drawIndicators()
    },
    width() {
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
        this.data.map((d) => new Date(+d.year, 0, 1))
      )

      const xScale = this.$d3
        .scaleTime()
        .domain(xScaleDomain)
        .range([0, chartWidth])

      const line = this.$d3
        .line()
        .defined((d) => +d.value > 0)
        .x((d) => xScale(new Date(+d.year, 0, 1)))
        .y(chartHeight / 2)

      const svg = this.$d3.select(this.$refs.mainSVG).select('.gContainer')

      svg
        .selectAll('.line')
        .data([this.data])
        .join('path')
        .attr('class', 'line')
        .attr('stroke', 'red')
        .attr('d', line)

      svg
        .selectAll('.lineMissing')
        .data([this.data.filter(line.defined())])
        .join('path')
        .attr('class', 'lineMissing')
        .attr('stroke', 'red')
        .attr('stroke-dasharray', '3,3')
        .attr('d', line)

      svg
        .selectAll('.dot')
        .data(this.data.filter((d) => +d.value > 0))
        .join('circle')
        .attr('class', 'dot')
        .attr('cy', chartHeight / 2)
        .attr('cx', (d) => xScale(new Date(+d.year, 0, 1)))
        .attr('fill', 'red')
        .attr('stroke', '#0b1418')
        .attr('r', 3)
    },
  },
}
</script>
