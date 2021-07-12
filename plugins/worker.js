import Vue from 'vue'
import * as Comlink from 'comlink'
import ComlinkWorker from '~/assets/scripts/comlink.worker.js'

const worker = Comlink.wrap(new ComlinkWorker())

Object.defineProperty(Vue.prototype, '$worker', { value: worker })
