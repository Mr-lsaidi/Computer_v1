const chalk = require("chalk");
const tools = require('./tools')

function SpecialCaseSolve(states)
{
    if (!states.eq_params['1'] && !states.eq_params['2'])
    {
        if (states.eq_params['0'])
            console.log(chalk.red("No solution possible"));
        else
            console.log("The solution is |R");
        states.graph = false
        return true
    }
    return false
}

function discriminant(states)
{
    const a = states.eq_params['2']
    const b = states.eq_params['1']
    const c = states.eq_params['0']
    // console.log(`a: ${a} b: ${b} c: ${c}`)
    states.discriminant = (tools.ABS(b * b)) - (4 * a * c)
    if (states.polynomial_degree == 2)
        console.log(chalk.green("discriminant :"), states.discriminant)
}

function NumberComlpexPrint(reel, imaginary, states) {
    if(reel && imaginary){
        console.log(`x1 = ${reel} + ${imaginary > 0 ? imaginary : imaginary * -1} i\nx2 = ${reel} - ${imaginary > 0 ? imaginary : imaginary * -1} i`);
        states.solution = `x1 = ${reel} + ${imaginary > 0 ? imaginary : imaginary * -1} i\nx2 = ${reel} - ${imaginary > 0 ? imaginary : imaginary * -1} i`
    }else if(!reel && imaginary){
         console.log(`x1 = ${imaginary} i\nx2 = - ${imaginary > 0 ? imaginary : imaginary * -1} i`);
         states.solution = `x1 = ${imaginary} i   |   x2 = - ${imaginary > 0 ? imaginary : imaginary * -1} i`
    }
}

function QuadraticForm(states)
{
    const a = states.eq_params['2']
    const b = states.eq_params['1']
    const c = states.eq_params['0']
    if (states.eq_params['2']){
        if (states.discriminant == 0)
        {
            console.log(chalk.underline("one solution:"));
            const x = (b * -1) / (2 * a);
            console.log(`solution : x = ${x}`);
            states.solution = `solution : x = ${x}`
        }
        else if (states.discriminant > 0)
        {
            console.log(chalk.underline("Solution is reel :"));
            const x1 = ((b * -1) + (tools.squareRoot(tools.ABS(states.discriminant)))) / (2 * a);
            const x2 = ((b * -1) - (tools.squareRoot(tools.ABS(states.discriminant)))) / (2 * a);
            console.log(`x1 = ${x1}\nx2 = ${x2}`);
            states.solution = `x1 = ${x1}   |   x2 = ${x2}`
        }
        else if (states.discriminant < 0)
        {
            console.log(chalk.underline("Solution is complex :"));
            const reel = (-b / (2 * a));
            const complex = (tools.squareRoot(tools.ABS(states.discriminant))) / (2 * a);
            NumberComlpexPrint(reel, complex, states);
        }
    }
    else if (states.polynomial_degree == 1){
        console.log(chalk.underline('The solution is :'));
        console.log(`x = ${-c / b}`);
        states.solution = `x = ${-c / b}`
    }
}


module.exports = {
    SpecialCaseSolve,
    discriminant,
    QuadraticForm,
}