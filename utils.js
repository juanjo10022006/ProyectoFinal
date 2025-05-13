export function resolverTorneo(input) {
  // Separar las tres partes
  const [nombreTorneo, separacionEquipos, separacionPartidos] = input.split('--').map(s => s.trim());
  const equipos = separacionEquipos.split(',').map(name => name.trim());
  const partidos = separacionPartidos.split(',').map(str => {
    const [equipoA, gA, gB, equipoB] = str.split('#').map(x => x.trim());
    return { equipoA, golesA: +gA, golesB: +gB, equipoB };
  });

  // Inicializar estadísticas
  const estadistica = {};
  equipos.forEach(name => estadistica[name] = { name, p: 0, w: 0, a: 0 });

  partidos.forEach(({equipoA, golesA, golesB, equipoB}) => {
  
    estadistica[equipoA].a += golesB;
    estadistica[equipoB].a += golesA;
    
    if (golesA > golesB) {
      estadistica[equipoA].p += 3; estadistica[equipoA].w++;
    } else if (golesA < golesB) {
      estadistica[equipoB].p += 3; estadistica[equipoB].w++;
    } else {
      estadistica[equipoA].p++; estadistica[equipoB].p++;
    }
  });

  // Convertir a array de equipos
  const arr = Object.values(estadistica);

  // Quicksort recursivo
  function quicksortTorneo(a) {
    if (a.length < 2) return a;
    const pivote = a[Math.floor(a.length/2)];
    const left = [], equal = [], right = [];
    for (const x of a) {
      if (compare(x, pivote) < 0) left.push(x);
      else if (compare(x, pivote) > 0) right.push(x);
      else equal.push(x);
    }
    return [...quicksortTorneo(right), ...equal, ...quicksortTorneo(left)];
  }
  // Función de comparación según criterios
  function compare(e1, e2) {
    if (e1.p !== e2.p) return e1.p - e2.p;
    if (e1.w !== e2.w) return e1.w - e2.w;
    if (e1.a !== e2.a) return e2.a - e1.a; 
    return e2.name.localeCompare(e1.name) * -1;
  }

  const sorted = quicksortTorneo(arr);

  // Búsqueda recursiva 
  function buscarEquipo(a, key, low=0, high=a.length-1) {
    if (low > high) return -1;
    const mid = Math.floor((low+high)/2);
    if (a[mid].name === key) return mid;
    if (a[mid].name > key) return buscarEquipo(a, key, low, mid-1);
    return buscarEquipo(a, key, mid+1, high);
  }

  let output = nombreTorneo + '\n';
  sorted.forEach((team, i) => {
    output += `${i+1}) ${team.name} ${team.p}p, ${team.w}w, ${team.a}a\n`;
  });
  return output.trim();
}
