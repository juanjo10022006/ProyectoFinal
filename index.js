import { resolverTorneo } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const inputTorneo = document.getElementById('input');
  const btnCalcular = document.getElementById('calcular');
  const resultadoTorneo = document.getElementById('resultado');

  btnCalcular.addEventListener('click', () => {
    const entrada = inputTorneo.value.trim();
    if (!entrada) {
      resultadoTorneo.value = 'Por favor ingresa la cadena del torneo.';
      return;
    }
    try {
      const salida = resolverTorneo(entrada);
      resultadoTorneo.value = salida;
    } catch (err) {
      resultadoTorneo.value = `Error al procesar: ${err.message}`;
    }
  });
});
