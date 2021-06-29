import Vue from 'vue'

import { csvParse } from 'd3-dsv'
import { select, selectAll } from 'd3-selection'
import { scaleBand, scaleQuantize } from 'd3-scale'
import { axisLeft } from 'd3-axis'
import { transition } from 'd3-transition'
import { easeQuadOut } from 'd3-ease'

const d3 = {
  // DSV
  csvParse,

  // SELECTION
  select,
  selectAll,

  // SCALE
  scaleBand,
  scaleQuantize,

  // AXIS
  axisLeft,

  // TRANSITION
  transition,

  // EASE
  easeQuadOut,
}

Object.defineProperty(Vue.prototype, '$d3', { value: d3 })
