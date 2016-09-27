let log = []
console.log = function (t) {
  log.push(t)
  process.stdout.write(t + '\n')
}

let cubeSummation = require('./CubeSummation')

const input = '2\n' +
  '4 5\n' +
  'UPDATE 2 2 2 4\n' +
  'QUERY 1 1 1 3 3 3\n' +
  'UPDATE 1 1 1 23\n' +
  'QUERY 2 2 2 4 4 4\n' +
  'QUERY 1 1 1 3 3 3\n' +
  '2 4\n' +
  'UPDATE 2 2 2 1\n' +
  'QUERY 1 1 1 1 1 1\n' +
  'QUERY 1 1 1 2 2 2\n' +
  'QUERY 2 2 2 2 2 2'

cubeSummation.correr(input)

if (log.toString() === '4,4,27,0,1,1') {
  console.log('Test satisfactorio')
} else {
  console.error('Test fallido, se esperaba [4,4,27,0,1,1] y la respuesta fue ' + log.toString())
}
