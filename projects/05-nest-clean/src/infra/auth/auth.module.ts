import { Env } from '@/infra/env'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtGuard } from './jwt-auth.guard'
import { JwtStrategy } from './jwt.strategy'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: async (config: ConfigService<Env, true>) => {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  providers: [JwtStrategy, { provide: APP_GUARD, useClass: JwtGuard }],
})
export class AuthModule {}
