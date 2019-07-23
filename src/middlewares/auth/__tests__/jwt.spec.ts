import { signJWT, decodeJWT, verifyJWT, createTokens } from '../jwt-utils'

// TODO: test for expiration time of the tokens

describe('JWT tests', () => {
  let jwtToken = ''
  let jwtRefreshToken = ''

  it('signs JWT token correctly', () => {
    jwtToken = signJWT({ payload: { world: 'hello' }, variant: 'accessToken' })
    expect(jwtToken).not.toBeFalsy()
    jwtRefreshToken = signJWT({ payload: { world: 'hello' }, variant: 'refreshToken' })
    expect(jwtToken).not.toBeFalsy()
  })

  it('decodes JWT token correctly', () => {
    expect(decodeJWT(jwtToken)).toMatchObject({
      world: 'hello'
    })
    expect(decodeJWT(jwtRefreshToken)).toMatchObject({
      world: 'hello'
    })
  })

  it('fails decoding a wrong JWT token', () => {
    expect(decodeJWT('hello world')).toBeNull()
  })

  it('fails verifying a wrong JWT token', () => {
    expect(() => {
      verifyJWT('hello world')
    }).toThrow()
  })

  it('creates a set of new tokens with given userId correctly', async () => {
    await expect(createTokens('1')).resolves.toBeArrayOfSize(2)
  })
})
