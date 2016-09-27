function log (text) {
  console.log(text)
  if (document) document.querySelector('#output').innerText += text + '\n'
}

function correr (input) {
  try {
    if (document) document.querySelector('#output').innerText += ''
    let inputArray = input.split('\n')
    if (inputArray.length < 3) throw new Error('Texto de entrada inválido')
    let lineaActual = 0
    let casos = parseInt(inputArray[ lineaActual++ ])

    for (let caso = 0; caso < casos; caso++) {
      let informacionCaso = inputArray[ lineaActual++ ].split(' ').map((n) => parseInt(n))
      let tamaño = informacionCaso[ 0 ]
      let operaciones = informacionCaso[ 1 ]
      let matriz = crearMatriz(tamaño)
      for (let operacion = 0; operacion < operaciones; operacion++) {
        let operacion = inputArray[ lineaActual++ ]
        correrOperacion(operacion, matriz)
      }
    }
  } catch (err) {
    console.error(err)
    document.querySelector('#error').innerText = err
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
    correrUpdate(operacionArray, matriz)
  } else if (tipo === 'QUERY') {
    correrQuery(operacionArray, matriz)
  } else {
    throw new Error('Tipo de operación inválido')
  }
}

function correrUpdate (valores, matriz) {
  const coord = {
    x: parseInt(valores[ 1 ]) - 1,
    y: parseInt(valores[ 2 ]) - 1,
    z: parseInt(valores[ 3 ]) - 1
  }
  const valor = parseInt(valores[ 4 ])
  matriz[ coord.x ][ coord.y ][ coord.z ] = valor
}

function correrQuery (valores, matriz) {
  const coordInicio = {
    x: parseInt(valores[ 1 ]) - 1,
    y: parseInt(valores[ 2 ]) - 1,
    z: parseInt(valores[ 3 ]) - 1
  }
  const coordFinal = {
    x: parseInt(valores[ 4 ]) - 1,
    y: parseInt(valores[ 5 ]) - 1,
    z: parseInt(valores[ 6 ]) - 1
  }
  let suma = 0
  for (let x = coordInicio.x; x <= coordFinal.x; x++) {
    for (let y = coordInicio.y; y <= coordFinal.y; y++) {
      for (let z = coordInicio.z; z <= coordFinal.z; z++) {
        suma += matriz[x][y][z]
      }
    }
  }
  log(suma)
}


