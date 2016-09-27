let input = '2\n' +
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

function correr (input) {
  let inputArray = input.split('\n')
  let lineaActual = 0
  let casos = parseInt(inputArray[ lineaActual++ ])

  for (let caso = 0; caso < casos; caso++) {
    let informacionCaso = inputArray[ lineaActual++ ].split(' ').map((n) => parseInt(n))
    let tamaño = informacionCaso[ 0 ]
    let operaciones = informacionCaso[ 1 ]
    let matriz = crearMatriz(tamaño)
    for (let operacion = 0; operacion < operaciones; operacion++) {
      correrOperacion(inputArray[ lineaActual++ ], matriz)
    }
  }
}

function crearMatriz (tamaño) {
  let matriz = []
  for (let i = 0; i < tamaño; i++) {
    matriz[ i ] = []
    for (let j = 0; j < tamaño; j++) {
      matriz[ i ][ j ] = []
      for (let k = 0; k < tamaño; k++) {
        matriz[ i ][ j ][ k ] = 0
      }
    }
  }
  return matriz
}

function correrOperacion (operacion, matriz) {
  let operacionArray = operacion.split(' ')
  let tipo = operacionArray[ 0 ]
  if (tipo === 'UPDATE') {
    const coord = {
      x: parseInt(operacionArray[ 1 ]) - 1,
      y: parseInt(operacionArray[ 2 ]) - 1,
      z: parseInt(operacionArray[ 3 ]) - 1
    }
    const valor = parseInt(operacionArray[ 4 ])
    matriz[ coord.x ][ coord.y ][ coord.z ] = valor
  } else if (tipo === 'QUERY') {
    const coordInicio = {
      x: parseInt(operacionArray[ 1 ]) - 1,
      y: parseInt(operacionArray[ 2 ]) - 1,
      z: parseInt(operacionArray[ 3 ]) - 1
    }
    const coordFinal = {
      x: parseInt(operacionArray[ 4 ]) - 1,
      y: parseInt(operacionArray[ 5 ]) - 1,
      z: parseInt(operacionArray[ 6 ]) - 1
    }
    let suma = 0
    for (let x = coordInicio.x; x <= coordFinal.x; x++) {
      for (let y = coordInicio.y; y <= coordFinal.y; y++) {
        for (let z = coordInicio.z; z <= coordFinal.z; z++) {
          suma += matriz[x][y][z]
        }
      }
    }
    console.log(suma)
  } else {
    throw new Error('Tipo de operación inválido')
  }
}

correr(input)



