const test = require('narval')

const gpioIn = require('gpio-in-domapic')

const Mock = function () {
  let sandbox = test.sinon.createSandbox()
  let eventListener

  const stubs = {
    init: sandbox.stub().resolves(),
    events: {
      on: sandbox.stub().callsFake((eventName, cb) => {
        eventListener = cb
      })
    }
  }

  const Constructor = sandbox.stub(gpioIn, 'Gpio').callsFake(function () {
    return stubs
  })

  Constructor.eventNames = {
    CHANGE: 'change'
  }

  const restore = () => {
    sandbox.restore()
  }

  return {
    restore,
    stubs: {
      Constructor,
      instance: stubs
    },
    utils: {
      getEventListener: () => eventListener
    }
  }
}

module.exports = Mock
