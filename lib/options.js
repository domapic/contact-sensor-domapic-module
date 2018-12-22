'use strict'

const { GPIO_OPTION, DEBOUNCE_OPTION, REVERSE_OPTION } = require('./statics')

module.exports = {
  [GPIO_OPTION]: {
    type: 'number',
    describe: 'Set gpio number for the sensor'
  },
  [DEBOUNCE_OPTION]: {
    type: 'number',
    describe: 'Set debounce timeout for the sensor',
    default: 1000
  },
  [REVERSE_OPTION]: {
    type: 'boolean',
    describe: 'Invert value of sensor',
    default: false
  }
}
