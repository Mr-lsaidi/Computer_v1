function SpecialCaseSolve(states)
{
    if (states.eq_params[1] == 0 && states.eq_params[2] == 0)
    {
        if (states.eq_params[0])
            console.log("No solution possible");
        else
            console.log("The solution is |R");
        return true
    }
    return false
}

function discriminant(states)
{
    const a = states.eq_params[2]
    const b = states.eq_params[1]
    const c = states.eq_params[0]
    console.log(`a: ${a} b: ${b} c: ${c}`)
    states.discriminant = (Math.abs(b * b)) - (4 * a * c)
    console.log(`discriminant ${states.discriminant}`)
}

function NumberComlpexPrint(reel, imaginary) {
    if(reel && imaginary)
        console.log(`x1 = ${reel} + ${imaginary} i\nx2 = ${reel} - ${imaginary} i`);
     else if(!reel && imaginary)
         console.log(`x1 = ${imaginary} i\nx2 = - ${imaginary} i`);
}

function QuadraticForm(states)
{
    const a = states.eq_params[2]
    const b = states.eq_params[1]
    const c = states.eq_params[0]
    if (states.polynomial_degree == 2){
        if (states.discriminant == 0)
        {
            console.log("one solution:");
            const x = (b * -1) / (2 * a);
            console.log(`solution : x = ${x}`);
        }
        else if (states.discriminant > 0)
        {
            console.log("Solution is reel :");
            const x1 = ((b * -1) + (Math.sqrt(Math.abs(states.discriminant)))) / (2 * a);
            const x2 = ((b * -1) - (Math.sqrt(Math.abs(states.discriminant)))) / (2 * a);
            console.log(`x1 = ${x1}\nx2 = ${x2}`);
        }
        else if (states.discriminant < 0)
        {
            console.log("Solution is complex :");
            const reel = (-b / (2 * a));
            const complex = (Math.sqrt(Math.abs(states.discriminant))) / (2 * a);
            NumberComlpexPrint(reel, complex);
        }
    }
    else if (states.polynomial_degree == 1){
        console.log(`The solution is :\nx = ${-c / b}`);
    }
}


module.exports = {
    SpecialCaseSolve,
    discriminant,
    QuadraticForm,
}