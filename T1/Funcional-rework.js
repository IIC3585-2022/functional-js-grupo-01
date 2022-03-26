const readline = require("readline-sync");

const S = f => g => (...x) => f(...x)(g(...x));

const K = x => y => x;

// function ingresar_jugada(nombre_jugador, puntaje_actual, lanzamientos)
// {
//   console.log(`Es el turno del jugador ${nombre_jugador} (${puntaje_actual} puntos)`);
//   puntaje_actual -= lanzamientos.reduce((a, b) => a + b);
//   console.log(`El jugador ${nombre_jugador} ha quedado con ${puntaje_actual} puntos`)
//   return puntaje_actual;
// }

const ingresar_jugada = (nombre_jugador, puntaje_actual, lanzamientos) => 
S(K)(
      (nuevo_puntaje) => console.log(`El jugador ${nombre_jugador} ha quedado con ${nuevo_puntaje} puntos`)
    )(
      K(puntaje_actual)(
        console.log(`Es el turno del jugador ${nombre_jugador} (${puntaje_actual} puntos)`)
      ) - tirar_veces(3).reduce((a, b) => a + b)
    );

const init_game = (...nombres_jugadores) => nombres_jugadores.map(nombre => [nombre, 501]);

function play_game(...jugadores)
{
  jugadores.forEach(jugador =>
    {
      jugador[1] = ingresar_jugada(jugador[0], jugador[1])
    })
  if(gameFinished(...jugadores))
  {
    return winnerPlayers(...jugadores);
  }
  return play_game(...jugadores);
}

const gameFinished = (...jugadores) => jugadores.some((jugador) => jugador[1] === 0);

const winnerPlayers = (...jugadores) => jugadores.filter((jugador) => jugador[1] === 0).map((jugador) => jugador[0])

function tirar_veces(n) { Array.from(Array(n).keys()).map(get_shot_input);}

function get_shot_input(n)
{
  let result = NaN;
  while (isNaN(result))
  {
    let input = readline.question(`Que anotó (${n+1})`).trim();
    if(input == "SB" || input == "DB")
    {
      result = puntaje_tiro(input);
    } else {
      let multiplier = readline.question(`Cual fue el multiplicador?`).trim();
      result = puntaje_tiro(input, multiplier)
    }
  }
  return result;
}

const puntaje_tiro = (lanzamiento, multiplicador) => lanzamiento == "DB" ? 50 : (lanzamiento == "SB" ? 25 : Number(lanzamiento.trim()) * Number(multiplicador.trim()));

const winDialogue = (...winners) => winners.length === 1 ? `Ha ganado ${winners[0]}` : `Hay un empate entre ${winners[0] + ' y ' + winners[1]}`;

console.log(winDialogue(...play_game(...init_game('Marcos', 'Jose'))));