const chalk = require("chalk");
const utils = require("./utils");
const solve = require("./solve");
const graph = require("./graph");

var args = process.argv.slice(2);

var spicial_case_vals = {
  equoal: false,
  FirstNegativeEq: false,
};

var states = {
  factor: 0,
  degree: 0,
  sign: false,
  equoal: false,
  eq_params: [0, 0, 0],
  graph_hand: null,
  discriminant: null,
  polynomial_degree: 0,
  error: false,
  solution: null,
  graph: false,
};

if (args.length === 1 || (args.length === 2 && args[1] === "-v")) {
  if (args.length === 2 && args[1] === "-v") states.graph = true;
  if (args[0]) {
    //remove whitespase replace theme with one space
    let string = args[0].replace(/\s+/g, "");
    //split the equoation

    string = string.match(/((\=)|[+-]|[^+=-]+)/g);
    utils.GetEquoation(string, spicial_case_vals, states);
    // let equoation = tools.spicial_case(string, spicial_case_vals, states);
    // if (equoation){
    //     for (let i = 0; i < equoation.length && !states.error; i++) {
    //         const element = equoation[i]
    //         if (tools.parsing(element)){
    //            tools.GetEqElements(element, states)
    //         }
    //         else{
    //             console.error(chalk.red('syntax error in equoation arg: '), "'"+element.trim()+"'");
    //             return
    //         }
    //     }
    //     if (equoation[equoation.length - 1].match(/(^[\ ]?\+[\ ]?$)|(^[\ ]?\-[\ ]?$)|(^[\ ]?\=[\ ]?$)/g)){
    //         states.error = true
    //         console.error(chalk.red('syntax error in equoation arg: '), "'"+equoation[equoation.length - 1].trim()+"'");
    //         return
    //     }
    //     if (!states.error){
    //         tools.GetEqElements('last', states)
    //         if (!solve.SpecialCaseSolve(states)){
    //             tools.Reduced(states)
    //             console.log(chalk.magenta("Polynomial degree:"), states.polynomial_degree);
    //             solve.discriminant(states)
    //             solve.QuadraticForm(states)
    //         }
    //     }
    // }
  } else {
    console.log(chalk.red("arg is empty"));
    states.graph = false;
  }
} else
  console.log(chalk.yellow('error number of params, usage node . "EQOUATION"'));

if (states.graph) graph.graph(states);
