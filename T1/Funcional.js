var readline = require('readline-sync');

// Operador Pipe
const pipe = functions => data => functions.reduce( (value, func) => func(value), data);

// Combinador de composición
const compose = (f,g) => (x) => f(g(x));

// K Combinator
const K = x => y => x;

// Custom combinator que recibe una funcion y evalua x en la funcion, para luego retornar x
const K2 = f => x => K(x)(f(x));

// Y Combinator
const Y = f => (x => x(x))(x => f(y => x(x)(y)));

// Funcion que hace log del puntaje actual y después devuelve el puntaje obtenido
const logScore = name => K2(arg => console.log(`${name} queda con ${Math.abs(arg)} puntos`));

// Funcion que genera una jugada (nombre, score) basado en las acciones del turno del jugador
const insertPlay = (name, score, plays) => [name, logScore(name)(Math.abs(plays.map((play) => 
    calculate_score(play)).reduce((a, b) => a - b, score)))];
    
// Funcion que calcula el puntaje adquirido con una accion del jugador
const calculate_score = play => play == "DB" ? 50 : (play == "SB" ? 25 : (play == "Null" ? 0 : play[1] * play[0]));

// Función que inicializa el puntaje de todos los jugadores en 501
const initGame = (players) => players.map((player) => [player, 501]);

// Función que revisa si hay algun jugador que haya llegado al puntaje 0.
const gameFinished = (scores) => scores.find((score) => score[1] === 0) ? true : false;

// Función que obtiene los nuevos puntajes de cada jugador tomando su puntaje anterior y sus nuevos lanzamientos.
const newScores = (scores) => scores.map((score) => insertPlay(score[0], score[1], JSON.parse(readline.question(`Ingrese lanzamiento de ${score[0]}:\n `))));

// Función que devuelve un arreglo con los nombres de los jugadores que tienen puntaje 0.
const winnerPlayers = (scores) => scores.filter((score) => score[1] === 0).map((winners) => winners[0]);

// Función que muestra el dialogo final cuando gana un jugador.
const winDialogue = (winners) => winners.length === 1 ? `Ha ganado ${winners[0]}` : `Hay un empate entre ${winners.slice(0, -1).join(', ') + ' y ' + winners.slice(-1)}`;

// Función recursiva que revisa si el juego ha teminado, y en caso contrario llama a newScores y vuelve a revisar si alguien gana recursivamente
const jugada = Y(f => scores => gameFinished(scores) ? console.log(pipe([winnerPlayers, winDialogue])(scores)) : compose(f, newScores)(scores));

// Funcion que inicializa el juego y lo detiene cuando está terminado
const playGame = (players) => K(jugada(initGame(players)))(console.log(`Juego inicializado por jugadores ${players.slice(0, -1).join(', ') + ' y ' +players.slice(-1)}`));


playGame(['JUAN', 'PETER']);
