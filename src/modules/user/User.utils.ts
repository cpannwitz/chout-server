import uuid from 'uuid'
import argon2 from 'argon2'

export async function hashPassword(payload: string) {
  return await argon2.hash(payload)
}

export function generateUuid() {
  return uuid.v4()
}
