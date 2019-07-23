import { cryptoEncode, cryptoVerify } from '../crypto'

describe('cryptography tests', () => {
  let hash = ''
  it('hashes an generic string', async () => {
    hash = await cryptoEncode('teststring')
    expect(hash).toBeString()
  })
  it('rejects something else than a string', async () => {
    await expect(cryptoEncode(43 as any)).toReject()
  })
  it('verifies the hash correctly', async () => {
    await expect(cryptoVerify(hash, 'teststring')).resolves.toBeTrue()
  })
  it('rejects the wrong hash', async () => {
    await expect(cryptoVerify(hash, 'lalala')).resolves.toBeFalse()
  })
})
