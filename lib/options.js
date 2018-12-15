'use strict'

const { GPIO_OPTION, DEBOUNCE_OPTION } = require('./statics')

module.exports = {
  [GPIO_OPTION]: {
    type: 'number',
    describe: 'Set gpio number for the sensor'
  },
  [DEBOUNCE_OPTION]: {
    type: 'number',
    describe: 'Set debounce timeout for the sensor',
    default: 1000
  }
}
