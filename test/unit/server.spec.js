const path = require('path')

const test = require('narval')

const DomapicMocks = require('./Domapic.mocks')
const GpioInMocks = require('./GpioIn.mocks')

test.describe('server', () => {
  const fooConfig = {
    gpio: 12,
    debounce: 300
  }
  let domapic
  let gpioIn
  let abilities

  test.before(async () => {
    domapic = new DomapicMocks()
    gpioIn = new GpioInMocks()
    domapic.stubs.module.config.get.resolves(fooConfig)
    require('../../server')
    await domapic.utils.resolveOnStartCalled()
  })

  test.after(() => {
    gpioIn.restore()
    domapic.restore()
  })

  test.it('should have created a Domapic Module, passing the package path', () => {
    test.expect(domapic.stubs.createModule.getCall(0).args[0].packagePath).to.equal(path.resolve(__dirname, '..', '..'))
  })

  test.it('should have called to start the gpio', () => {
    test.expect(gpioIn.stubs.instance.init).to.have.been.called()
  })

  test.it('should have called to start the server', () => {
    test.expect(domapic.stubs.module.start).to.have.been.called()
  })

  test.describe('when domapic module is returned', () => {
    test.it('should have created a domapic gpio in', () => {
      test.expect(gpioIn.stubs.Constructor).to.have.been.calledWith(domapic.stubs.module, {}, {
        debounceTimeout: 'debounce'
      })
    })

    test.it('should have registered abilities', () => {
      abilities = domapic.stubs.module.register.getCall(0).args[0]
      test.expect(domapic.stubs.module.register).to.have.been.called()
    })
  })

  test.describe('contactSensor state handler', () => {
    test.it('should return current gpio status', () => {
      gpioIn.stubs.instance.status = true
      test.expect(abilities.contactSensor.state.handler()).to.equal(true)
    })
  })

  test.describe('contactSensor events listener', () => {
    test.it('should emit a domapic event', () => {
      gpioIn.utils.getEventListener()(true)
      test.expect(domapic.stubs.module.events.emit).to.have.been.calledWith('contactSensor', true)
    })
  })
})
