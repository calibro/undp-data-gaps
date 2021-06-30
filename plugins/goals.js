import Vue from 'vue'
import developmentGoals from '~/data/development-goals.json'

Object.defineProperty(Vue.prototype, '$goals', { value: developmentGoals })
