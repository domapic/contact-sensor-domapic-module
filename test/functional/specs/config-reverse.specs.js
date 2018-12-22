const test = require('narval')

const utils = require('./utils')

test.describe('module configuration', function () {
  this.timeout(10000)
  let connection

  test.before(() => {
    connection = new utils.Connection()
  })

  test.it('should be exposed in config api', () => {
    return connection.request('/config', {
      method: 'GET'
    }).then(response => {
      return Promise.all([
        test.expect(response.statusCode).to.equal(200),
        test.expect(response.body.debounce).to.equal(3000),
        test.expect(response.body.gpio).to.equal(18),
        test.expect(response.body.reverse).to.equal(true)
      ])
    })
  })
})
