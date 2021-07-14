<template>
  <svg ref="mainSVG" :height="height" :width="width">
    <g
      class="gContainer"
      :transform="`translate(${margins.left},${margins.top})`"
    ></g>
  </svg>
</template>

<script>
import tippy from 'tippy.js'

export default {
  name: 'DataUpToDateVizIndicatorsSum',

  props: ['height', 'width', 'data', 'max', 'margins', 'country'],

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
      .attr('class', 'dot data-up-to-date-viz-sum__dot')
      .attr('cy', chartHeight / 2)
      .attr('cx', (d) => xScale(d.date))
      .attr('fill', 'red')
      .attr('stroke', '#0b1418')
      .attr('r', (d) => radiusScale(d.value))
      .attr('data-country', this.country)
      .attr('data-max', this.max)
      .each(function (d) {
        /* ----------- TOOLTIPS ----------- */
        tippy(this, {
          content(reference) {
            const year = new Date(d.date).getFullYear()

            return `
            <div class="d-flex flex-column">
              <span style="color: red">SDG</span>
              <span>${year} - ${reference.dataset.country}</span>
              <span><strong>Indicators available: ${d.value}/${reference.dataset.max}</strong></span>
            </div>
          `
          },
          allowHTML: true,
          placement: 'auto',
          delay: [300, null],
        })
      })
  },
}
</script>
