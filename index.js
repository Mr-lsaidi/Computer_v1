const chalk = require('chalk')
const tools = require('./tools')
const solve = require('./solve')
const graph = require('./graph');

var args = process.argv.slice(2);

var special_case_vals = {
    equoal: false,
    FirstNegativeEq: false,
}

var states = {
    factor: 0,
    degree: 0,
    sign: false,
    equoal: false,
    eq_params: {0 : 0, 1: 0, 2: 0},
    graph_hand: null, 
    discriminant: null,
    polynomial_degree: 0,
    error: false,
    solution: null,
    graph: false
}

if (args.length === 1 || (args.length === 2 && args[1] === '-v')){
    if (args.length === 2 && args[1] === '-v')
        states.graph = true
    if (args[0])
    {
        let string = args[0].replace(/\s+/g, "")
        string = string.match(/((\=)|[+-]|[^+=-]+)/g)

        let equation = tools.special_case(string, special_case_vals, states);
        if (equation && !states.error){
            for (let i = 0; i < equation.length; i++) {
                const element = equation[i]
                if (tools.parsing(element)){
                   tools.GetEqElements(element, states)
                }
                else{
                    console.error(chalk.red('syntax error in equation arg: '), "'"+element.trim()+"'");
                    return
                }
            }
            if (equation[equation.length - 1].match(/(^[\ ]?\+[\ ]?$)|(^[\ ]?\-[\ ]?$)|(^[\ ]?\=[\ ]?$)/g)){
                states.error = true
                console.error(chalk.red('syntax error in equation arg: '), "'"+equation[equation.length - 1].trim()+"'");
                return
            }
            if (!states.error){
                tools.GetEqElements('last', states)
                tools.check_polynomial_degree(states)
                tools.Reduced(states)
                console.log(chalk.magenta("Polynomial degree:"), states.polynomial_degree);
                if (parseInt(Object.keys(states.eq_params)[Object.keys(states.eq_params).length - 1]) > 2){
                    console.log(chalk.dim("The polynomial degree is stricly greater than 2, I can't solve."));
                    states.graph = false
                }
                else if (!solve.SpecialCaseSolve(states)){
                    solve.discriminant(states)
                    solve.QuadraticForm(states)
                }
            }
        }
    }
    else{
        console.log(chalk.yellow("arg is empty"))
        states.graph = false
    }
}
else
    console.log(chalk.yellow('error number of params, usage node . "EQUATION"'))

if (states.graph)
    graph.graph(states)