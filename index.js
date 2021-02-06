const tools = require('./tools')

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
        console.log(equoation);
        if (equoation){
            for (let i = 0; i < equoation.length && !states.error; i++) {
                const element = equoation[i]
                //console.log("|",element,"|");
                if (tools.parsing(element)){
                   tools.GetEqElements(element, states)
                }
                else{
                    console.error('syntax error in equoation arg: ', "'"+element.trim()+"'");
                    return
                }
            }
            tools.GetEqElements('last', states)
        }
    }
    else
        console.log("arg is empty")
}
else
    console.log("error number of params")