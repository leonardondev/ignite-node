// Streams -> Processa dados aos poucos
// ReadableStream => servidor recebe informação (Upload de um arquivo grande)
// WritableStream => servidor envia informação  (Netflix, Spotfy, etc.)

// process.stdin.pipe(process.stdout)

import { Readable, Transform, Writable } from 'node:stream'

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

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {

    console.log(Number(chunk.toString()) * 10)

    callback()
  }
}


class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

// new OneToHundredStream().pipe(process.stdout)

// new OneToHundredStream()
//   .pipe(new MultiplyByTenStream())

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())
