import { normalizePort, onListening, onError, gracefulHandler } from '../serverUtils'

describe('serverUtils tests', () => {
  describe('normalizePort tests', () => {
    it('normalizes a port correctly', () => {
      expect(normalizePort('3000')).toEqual(3000)
      expect(normalizePort(3000 as any)).toEqual(3000)
    })

    it('returns undefined on freaky port number', () => {
      expect(normalizePort('-2')).toBeUndefined()
      expect(normalizePort('abc')).toBeUndefined()
    })
  })

  describe('onListening tests', () => {
    it('returns the correct message', () => {
      expect(
        onListening({
          address: () => ({ port: 3000 })
        })
      ).toEqual('Listening on port 3000')
      expect(
        onListening({
          address: () => '3000'
        })
      ).toEqual('Listening on pipe 3000')
    })
  })
})
