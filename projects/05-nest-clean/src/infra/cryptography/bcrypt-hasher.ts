import { compare, hash } from 'bcryptjs'

import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { HashValidator } from '@/domain/forum/application/cryptography/hash-validator'

export class BcryptHasher implements HashGenerator, HashValidator {
  private HASH_SALT_LENGTH = 8

  hash(plain: string) {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hashed: string) {
    return compare(plain, hashed)
  }
}
