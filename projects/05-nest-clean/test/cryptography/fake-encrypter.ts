import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>) {
    return Promise.resolve(JSON.stringify(payload))
  }
}
