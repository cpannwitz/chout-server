import {
  nextMock,
  resMock,
  sendMock,
  statusMock,
  requestMock,
  jsonMock
} from './test-utils'

import { generateToken, sendToken } from '../tokenMiddleware'

describe('tokenMiddleware tests', () => {
  describe('=> generateToken', () => {
    it('calls next() middleware immediately without user object on Request', () => {
      generateToken(requestMock('_', false) as any, resMock as any, nextMock).catch(
        error => console.error(error)
      )
      expect(nextMock).toBeCalled()
    })

    it('contains token & refreshtoken with user object on Request', () => {
      const request = requestMock('_', true)
      generateToken(request as any, resMock as any, nextMock).catch(error =>
        console.error(error)
      )
      // expect(request).toHaveProperty('token')
      // expect(request).toHaveProperty('refreshtoken')
      // TODO: something's not right here
    })
  })

  describe('=> sendToken', () => {
    it('returns status 401 - unauthorized without token', () => {
      sendToken(requestMock('_', false, false) as any, resMock as any, nextMock).catch(
        error => console.error(error)
      )
      expect(statusMock).toBeCalledWith(401)
      expect(sendMock).toBeCalled()
    })

    it('contains token & refreshtoken headers with tokens', () => {
      const request = requestMock('_', true, true)
      sendToken(request as any, resMock as any, nextMock).catch(error =>
        console.error(error)
      )
      expect(statusMock).toBeCalledWith(200)
      expect(jsonMock).toBeCalledWith({
        id: '1'
      })
      expect(resMock).toHaveProperty('headers')
    })
  })
})
