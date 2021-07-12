<template>
  <svg :height="height" :width="width" ref="mainSVG">
    <g
      class="gContainer"
      :transform="`translate(${margins.left},${height})`"
    ></g>
  </svg>
</template>

<script>
export default {
  props: ['height', 'width', 'data', 'margins'],
  name: 'DataUpToDateVizIndicatorsAxis',
  mounted() {
    const chartWidth = this.width - this.margins.left - this.margins.right
    // const chartHeight = this.height - this.margins.top - this.margins.bottom

    const xScale = this.$d3
      .scaleTime()
      .nice()
      .domain(this.$d3.extent(this.data))
      .range([0, chartWidth])

    // const svg = this.$d3.select(this.$refs.mainSVG).select('.gContainer')

    const gAxis = this.$d3.select(this.$refs.mainSVG).select('.gContainer')

    // if (gAxis.empty()) {
    //   gAxis = svg
    //     .append('g')
    //     .attr('id', 'axis')
    //     .attr('transform', `translate(0,${this.height})`)
    // }
    const axisTop = this.$d3.axisTop(xScale).tickSizeOuter(0)

    gAxis.call(axisTop)
  },
}
</script>
