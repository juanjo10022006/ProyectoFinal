import { resolverTorneo } from './utils.js';

document.getElementById("procesar").addEventListener("click", () => {
    const input = document.getElementById("input").value;
    try {
        const output = resolverTorneo(input);
        document.getElementById("output").textContent = output;
    } catch (error) {
        document.getElementById("output").textContent = "Error: " + error.message;
    }
});

//Esta es app