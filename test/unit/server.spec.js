const test = require('narval')

test.describe('server', () => {
  test.it('should exist', () => {
    require('../../server')
  })
})
