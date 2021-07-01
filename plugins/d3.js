import Vue from 'vue'

import { csvParse } from 'd3-dsv'
import { select, selectAll } from 'd3-selection'
import { scaleBand, scaleLinear, scaleOrdinal, scaleSqrt } from 'd3-scale'
import { axisLeft } from 'd3-axis'
import { transition } from 'd3-transition'
import { easeQuadOut } from 'd3-ease'
import { rollups, median, descending, range } from 'd3-array'
import { arc } from 'd3-shape'

const d3 = {
  // DSV
  csvParse,

  // SELECTION
  select,
  selectAll,

  // SCALE
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  scaleSqrt,

  // AXIS
  axisLeft,

  // TRANSITION
  transition,

  // EASE
  easeQuadOut,

  // ARRAY
  rollups,
  median,
  descending,
  range,

  // SHAPE
  arc,
}

Object.defineProperty(Vue.prototype, '$d3', { value: d3 })
