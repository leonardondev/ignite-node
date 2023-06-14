// buffer: representação BINÁRIA de dados dentro do javascript para deixar a escrita performática

// Buffer.from(arr: Array<Uint8>) => cria um buffer a partir de uma list de letras(string) ou números (0-255)
// Buffer.concat(arr: Array<Buffer>) => concatena fragmentos binários em um único buffer
// buf.toString("utf8") => retorna o conteúdo binário em uma codificação legível (se possível)


const buf1 = Buffer.from("ok")
const buf2 = Buffer.from(" estou")
const buf3 = Buffer.from(" aqui.")

console.log(buf1)
console.log(buf2)
console.log(buf3)

const data = Buffer.concat([buf1, buf2, buf3])
console.log(data)

console.log(data.toString("utf8"))
