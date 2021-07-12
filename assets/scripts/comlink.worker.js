import * as Comlink from 'comlink'

import {
  computeXValues,
  computeYValues,
  computeRectsValues,
} from '~/assets/scripts/utils/data-disaggregation.utils.js'

const fns = {
  computeXValues,
  computeYValues,
  computeRectsValues,
}

Comlink.expose(fns)
