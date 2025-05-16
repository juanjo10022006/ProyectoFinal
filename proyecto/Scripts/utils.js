function resolverTorneo(torneo) {
    // Dividir la entrada en partes: nombre del torneo, equipos, partidos
    const parts = torneo.split("--");
    
    const tournamentName = parts[0].trim();
    const teamsStr = parts[1].trim();
    const matchesStr = parts[2].trim();

    // Obtener lista de equipos
    const teams = teamsStr.split(",").map(team => team.trim());
    
    // Inicializar datos de los equipos
    const teamsData = {};
    teams.forEach(team => {
        teamsData[team] = { points: 0, wins: 0, goalsAgainst: 0 };
    });

    // Procesar los partidos
    const matches = matchesStr.split(",").map(match => match.trim());
    matches.forEach(match => {
        // Dividir el partido por # para obtener equipo1, goles1, goles2, equipo2
        const [team1, goals1Str, goals2Str, team2] = match.split("#");
        
        const goals1 = parseInt(goals1Str, 10);
        const goals2 = parseInt(goals2Str, 10);

        const team1Data = teamsData[team1.trim()];
        const team2Data = teamsData[team2.trim()];

        // Actualizar goles en contra
        team1Data.goalsAgainst += goals2;
        team2Data.goalsAgainst += goals1;

        // Calcular puntos y victorias
        if (goals1 > goals2) {
            team1Data.points += 3;
            team1Data.wins += 1;
        } else if (goals1 < goals2) {
            team2Data.points += 3;
            team2Data.wins += 1;
        } else {
            team1Data.points += 1;
            team2Data.points += 1;
        }
    });

    // Convertir a arreglo para ordenar
    const teamsArray = Object.entries(teamsData).map(([name, data]) => ({ name, ...data }));

    // Ordenar según criterios
    teamsArray.sort((a, b) => {
        if (a.points !== b.points) return b.points - a.points; // Descendente por puntos
        if (a.wins !== b.wins) return b.wins - a.wins;         // Descendente por victorias
        if (a.goalsAgainst !== b.goalsAgainst) return a.goalsAgainst - b.goalsAgainst; // Ascendente por goles en contra
        return a.name.localeCompare(b.name);                   // Ascendente por nombre
    });

    // Generar salida
    const outputLines = teamsArray.map((team, index) => {
        const rank = index + 1;
        return `${rank}) ${team.name} ${team.points}p, ${team.wins}w, ${team.goalsAgainst}a`;
    });

    return outputLines.join("\n");
}

export { resolverTorneo };