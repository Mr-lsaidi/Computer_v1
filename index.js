const tools = require('./tools')
const solve = require('./solve')

var args = process.argv.slice(2);

var spicial_case_vals = {
    equoal: false,
    FirstNegativeEq: false,
}

var states = {
    factor: 0,
    degree: 0,
    sign: false,
    equoal: false,
    eq_params: [0,0,0],
    discriminant: null,
    polynomial_degree: 0,
    error: false
}

if (args.length === 1)
{
    if (args[0])
    {
        //remove whitespase replace theme with one space    
        let string = args[0].replace(/\s+/g, " ")
        //split the equoation
        string = string.match(/((\=)|[+-]|[^+=-]+)/g)
        let equoation = tools.spicial_case(string, spicial_case_vals);
        //console.log(equoation)
        if (equoation){
            for (let i = 0; i < equoation.length && !states.error; i++) {
                const element = equoation[i]
                if (tools.parsing(element)){
                   tools.GetEqElements(element, states)
                }
                else{
                    console.error('syntax error in equoation arg: ', "'"+element.trim()+"'");
                    return
                }
            }
            if (!states.error){
                tools.GetEqElements('last', states)
                if (!solve.SpecialCaseSolve(states)){
                    console.log(`Reduced form: `+`${states.eq_params[0] ? `${states.eq_params[0]} * X ^ 0`: "" }`+`${states.eq_params[1] ? `${tools.Reduced(states.eq_params[1])} * X ^ 1`: "" }`+`${states.eq_params[2] ? `${tools.Reduced(states.eq_params[2])} * X ^ 2`: "" }`+" = 0");
                    console.log(states.eq_params);
                    solve.discriminant(states)
                    solve.QuadraticForm(states)
                }
            }
        }
    }
    else
        console.log("arg is empty")
}
else
    console.log("error number of params")