var readline = require('readline-sync');

const pipe = functions => data => {
    return functions.reduce( (value, func) => func(value), data);
};

const compose = (f,g) => (x) => f(g(x));


const insertPlay = (name, score, plays) => {
    const obtained_score = plays.map((play) => {
        switch (play) {
            case "DB":
                return 50
            case "SB":
                return 25
            case "Null":
                return 0
            default:
                return play[1] * play [0]
        }
    }).reduce((a, b) => a - b, score);

    console.log(`${name} queda con ${Math.abs(obtained_score)} puntos`)

    return [name, Math.abs(obtained_score)];
};
// Función que inicializa el puntaje de todos los jugadores en 501
const initGame = (...players) => players.map((player) => [player, 501]);

// Función que revisa si hay algun jugador que haya llegado al puntaje 0.
const gameFinished = (scores) => scores.find((score) => score[1] === 0) ? true : false;

// Función que obtiene los nuevos puntajes de cada jugador tomando su puntaje anterior y sus nuevos lanzamientos.
const newScores = (scores) => scores.map((score) => insertPlay(score[0], score[1], JSON.parse(readline.question(`Ingrese lanzamiento de ${score[0]}:\n `))));

// Función que devuelve un arreglo con los nombres de los jugadores que tienen puntaje 0.
const winnerPlayers = (scores) => scores.filter((score) => score[1] === 0).map((winners) => winners[0]);

// Función que muestra el dialogo final cuando gana un jugador.
const winDialogue = (winners) => winners.length === 1 ? `Ha ganado ${winners[0]}` : `Hay un empate entre ${winners.slice(0, -1).join(', ') + ' y ' + winners.slice(-1)}` 

// Función recursiva que revisa si el juego ha teminado, y en caso contrario llama a newScores y vuelve a revisar si alguien gana recursivamente
const jugada = scores => gameFinished(scores) ? console.log(pipe([winnerPlayers, winDialogue])(scores)) : compose(jugada, newScores)(scores);

const playGame = (...players) => {
    console.log(`Juego inicializado por jugadores ${players.slice(0, -1).join(', ') + ' y ' +players.slice(-1)}`);
    jugada(initGame(...players));
};

playGame('JUAN', 'PETER');