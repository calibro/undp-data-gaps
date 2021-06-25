import Vue from 'vue'

import { csvParse } from 'd3-dsv'

import { select } from 'd3-selection'

import { scaleBand } from 'd3-scale'

const d3 = {
  // DSV
  csvParse,

  // SELECTION
  select,

  // SCALE
  scaleBand,
}

Object.defineProperty(Vue.prototype, '$d3', { value: d3 })
