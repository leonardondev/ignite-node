import fs from 'node:fs/promises'

// console.log(import.meta.url)
const databasePath = new URL('../db.json', import.meta.url)

// { "users": [...] }

export class Database {
  #database = {}  // atributo privado no javascript

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
      this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  // método privado no javascript
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    }
    else {
      this.#database[table] = [data]
    }

    this.#persist();

    return data
  }

}
