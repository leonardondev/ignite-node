import { Readable } from 'node:stream'

const chunks = Array.from({ length: 10 }).map((_,i)=> Buffer.from(`${i+1} `))

class OneToHundredStream extends Readable {
  index = 0

  _read() {
    const i = this.index++

    setTimeout(() => {
      if(i > 10) {
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
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data + ' <- dados processados no servidor')
})
