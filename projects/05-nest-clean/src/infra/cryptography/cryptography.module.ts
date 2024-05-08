import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'

import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { HashValidator } from '@/domain/forum/application/cryptography/hash-validator'

@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HashValidator, useClass: BcryptHasher },
    { provide: Encrypter, useClass: JwtEncrypter },
  ],
  exports: [HashGenerator, HashValidator, Encrypter],
})
export class CryptographyModule {}
