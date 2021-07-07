<template>
  <svg :height="height" :width="width" ref="mainSVG">
    <g
      class="gContainer"
      :transform="`translate(${margins.left},${margins.top})`"
    ></g>
  </svg>
</template>

<script>
export default {
  props: ['height', 'width', 'data', 'max', 'margins'],
  name: 'DataUpToDateVizIndicatorsSum',
  mounted() {
    const chartWidth = this.width - this.margins.left - this.margins.right
    const chartHeight = this.height - this.margins.top - this.margins.bottom

    const all = this.$d3.merge(
      this.data.map((d) => {
        return d[1][0]
      })
    )

    const group = this.$d3
      .rollups(
        all,
        (v) => this.$d3.sum(v, (d) => d.value),
        (d) => d.year
      )
      .map((d) => {
        return { date: new Date(+d[0], 0, 1), value: d[1] }
      })

    const xScaleDomain = this.$d3.extent(group, (d) => d.date)

    // const radiusScaleDomain = this.$d3.extent(group, (d) => d.value)

    const xScale = this.$d3
      .scaleTime()
      .domain(xScaleDomain)
      .range([0, chartWidth])

    const radiusScale = this.$d3
      .scaleSqrt()
      .domain([0, 1, this.max])
      .range([0, 2, chartHeight / 2])

    const svg = this.$d3.select(this.$refs.mainSVG).select('.gContainer')

    svg
      .selectAll('.dot')
      .data(group)
      .join('circle')
      .attr('class', 'dot')
      .attr('cy', chartHeight / 2)
      .attr('cx', (d) => xScale(d.date))
      .attr('fill', 'red')
      .attr('stroke', '#0b1418')
      .attr('r', (d) => radiusScale(d.value))
  },
}
</script>
