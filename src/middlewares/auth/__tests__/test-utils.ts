export const nextMock = jest.fn()
export const sendMock = jest.fn()
export const jsonMock = jest.fn()
export const statusMock = jest.fn()
export const setHeaderMock = jest.fn()
export const resMock = {
  send: sendMock,
  json: (params: any) => jsonMock(params),
  status: function(params: any) {
    statusMock(params)
    return this
  },
  setHeader: function(key: string, value: string) {
    setHeaderMock(key, value)
    ;(this as any).headers = {
      ...(this as any).headers,
      [key]: value
    }
  }
}
export const requestMock = (token?: any, user = false, tokens = false) => ({
  connection: { remoteAddress: '0' },
  headers: { authorization: token },
  user: user
    ? {
        id: '1'
      }
    : undefined,
  token: tokens ? '1' : undefined,
  refreshtoken: tokens ? '1' : undefined
})
