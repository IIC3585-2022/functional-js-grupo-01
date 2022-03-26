const readline = require("readline-sync");

const S = f => g => (...x) => f(...x)(g(...x));

const K = x => y => x;

const compose = (f,g) => (x) => f(g(x));

const imprimir_nuevo_puntaje = (nombre_jugador) => nuevo_puntaje => console.log(`El jugador ${nombre_jugador} ha quedado con ${nuevo_puntaje} puntos`);

const ingresar_jugada = (nombre_jugador, puntaje_actual, lanzamientos) => 
S(K)(imprimir_nuevo_puntaje(nombre_jugador))(
      Math.abs(K(puntaje_actual)(
        console.log(`Es el turno del jugador ${nombre_jugador} (${puntaje_actual} puntos)`)
      ) - tirar_veces(3).reduce((a, b) => a + b)
    ));

const init_game = (...nombres_jugadores) => nombres_jugadores.map(nombre => [nombre, 501]);

const newTurn = jugadores => jugadores.map((jugador) => [jugador[0], ingresar_jugada(jugador[0], jugador[1])]);

const continueOrFinish = (jugadores) => gameFinished(jugadores) ? winnerPlayers(jugadores) : play_game(jugadores);

const play_game = (jugadores) => compose(continueOrFinish, newTurn)(jugadores)

const gameFinished = (jugadores) => jugadores.some((jugador) => jugador[1] === 0);

const winnerPlayers = (jugadores) => jugadores.filter((jugador) => jugador[1] === 0).map((jugador) => jugador[0])

const tirar_veces = (n) => Array.from(Array(n).keys()).map((value) => get_shot_input(value, NaN))

const getScore = (n, input) => input == "SB" || input == "DB" ? get_shot_input(n, puntaje_tiro(input)) : 
                    get_shot_input(n, puntaje_tiro(input, readline.question(`Cual fue el multiplicador?`).trim()));

const get_shot_input = (n, result) => isNaN(result) ? getScore(n, readline.question(`Que anotó (${n+1})`).trim()) : result

const puntaje_tiro = (lanzamiento, multiplicador) => lanzamiento == "DB" ? 50 : (lanzamiento == "SB" ? 25 : Number(lanzamiento.trim()) * Number(multiplicador.trim()));

const winDialogue = (...winners) => winners.length === 1 ? `Ha ganado ${winners[0]}` : `Hay un empate entre ${winners[0] + ' y ' + winners[1]}`;

console.log(winDialogue(...play_game(init_game('Marcos', 'Jose'))));