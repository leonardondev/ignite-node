import { knex as setup, Knex } from 'knex'

export const config: Knex.Config = {
  debug: false,
  client: 'sqlite3', // or 'better-sqlite3'
  useNullAsDefault: true,
  connection: {
    filename: './db/app.db',
  },
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setup(config)
