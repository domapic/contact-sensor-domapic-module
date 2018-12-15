const test = require('narval')

const utils = require('./utils')

test.describe('contact sensor api', function () {
  this.timeout(10000)
  let connection

  test.before(() => {
    connection = new utils.Connection()
  })

  test.describe('contact sensor state', () => {
    test.it('should return false', () => {
      return connection.request('/abilities/contact-sensor/state', {
        method: 'GET'
      }).then(response => {
        return Promise.all([
          test.expect(response.statusCode).to.equal(200),
          test.expect(response.body).to.deep.equal({
            data: false
          })
        ])
      })
    })
  })
})
