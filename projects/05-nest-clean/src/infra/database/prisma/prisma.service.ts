import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaClientInitializationError } from '@prisma/client/runtime/library'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['warn', 'error'],
      errorFormat: 'pretty',
    })
  }

  async onModuleInit() {
    try {
      await this.$connect()
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        console.error(error.message)
        process.exit(1)
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
