import { knex as setup, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  debug: false,
  client: 'sqlite3', // or 'better-sqlite3'
  useNullAsDefault: true,
  connection: {
    filename: env.DATABASE_URL,
  },
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setup(config)
