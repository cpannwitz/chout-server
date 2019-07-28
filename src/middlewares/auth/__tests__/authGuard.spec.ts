import { nextMock, resMock, sendMock, statusMock, requestMock } from './test-utils'

import { authGuard } from '../authGuard'
import { signJWT } from '../jwt-utils'

describe('authGuard tests', () => {
  it('returns status 401 - unauthorized without token', () => {
    authGuard(requestMock() as any, resMock as any, nextMock).catch(error =>
      console.error(error)
    )
    expect(statusMock).toBeCalledWith(401)
    expect(sendMock).toBeCalled()
  })

  it('returns status 401 - unauthorized with incorrect token', () => {
    authGuard(requestMock('bla') as any, resMock as any, nextMock).catch(error =>
      console.error(error)
    )
    expect(statusMock).toBeCalledWith(401)
    expect(sendMock).toBeCalled()
  })

  it('calls next() middleware with correct token', () => {
    const token = signJWT({ payload: { userId: '1' } })
    const request = requestMock(token)
    authGuard(request as any, resMock as any, nextMock).catch(error =>
      console.error(error)
    )
    expect(nextMock).toBeCalled()
  })

  it('contains correct jwtPayload on further Request object', () => {
    const payload = { userId: '1' }
    const token = signJWT({ payload: payload })
    const request = requestMock(token)
    authGuard(request as any, resMock as any, nextMock).catch(error =>
      console.error(error)
    )
    expect(request).toMatchObject({
      jwtPayload: payload
    })
  })
})
