const test = require('narval')

test.describe('cli', () => {
  test.it('should exist', () => {
    require('../../../lib/cli')
  })
})
