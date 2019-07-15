import argon2 from 'argon2'

export async function cryptoEncode(payload: string) {
  return await argon2.hash(payload)
}

export async function cryptoVerify(hash: string, toCheck: string) {
  return await argon2.verify(hash, toCheck)
}
