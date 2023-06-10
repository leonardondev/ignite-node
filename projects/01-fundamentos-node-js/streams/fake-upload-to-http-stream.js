import { Readable } from 'node:stream'

const chunks = Array.from({ length: 100 }).map((_,i)=> Buffer.from(`${i} `))

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if(i > 100) {
        this.push(null)
      } else {
        this.push(chunks[i])
      }
    }, 500)
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
})
