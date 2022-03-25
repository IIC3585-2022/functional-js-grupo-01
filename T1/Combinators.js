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

module.exports = {
  pipe,
  compose,
  K,
  K2,
  Y
};