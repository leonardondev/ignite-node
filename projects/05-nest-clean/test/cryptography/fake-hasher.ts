import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { HashValidator } from '@/domain/forum/application/cryptography/hash-validator'

export class FakeHasher implements HashGenerator, HashValidator {
  async hash(plain: string) {
    return Promise.resolve(plain.concat('-hashed'))
  }

  async compare(plain: string, hashed: string) {
    return Promise.resolve(plain.concat('-hashed') === hashed)
  }
}
