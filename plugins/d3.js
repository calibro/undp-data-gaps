import Vue from 'vue'

import { csvParse } from 'd3-dsv'
import { select, selectAll } from 'd3-selection'
import {
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  scaleSqrt,
  scaleTime,
} from 'd3-scale'
import { axisLeft, axisTop } from 'd3-axis'
import { transition } from 'd3-transition'
import { easeQuadOut } from 'd3-ease'
import {
  rollups,
  groups,
  median,
  descending,
  range,
  extent,
  merge,
  sum,
  max,
} from 'd3-array'
import { arc, line } from 'd3-shape'

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
  scaleTime,

  // AXIS
  axisLeft,
  axisTop,

  // TRANSITION
  transition,

  // EASE
  easeQuadOut,

  // ARRAY
  rollups,
  groups,
  median,
  descending,
  range,
  extent,
  merge,
  sum,
  max,

  // SHAPE
  arc,
  line,
}

Object.defineProperty(Vue.prototype, '$d3', { value: d3 })
