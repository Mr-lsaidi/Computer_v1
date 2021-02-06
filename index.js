const tools = require('./tools')

var args = process.argv.slice(2);

var spicial_case_vals = {
    equoal: false,
    FirstNegativeEq: false,
}

var states = {
    factor: false,
    degre: false,
    x_var: false,
    multiple: false,
    equoal: false,
    eq_params: []
}

if (args.length === 1)
{
    if (args[0])
    {
        
        //remove whitespase replace theme with one space    
        let string = args[0].replace(/\s+/g, " ")
        //split the equoation
        string = string.match(/((\=)|[+-]|[^+=-]+)/g)
        console.log(string);
        let equoation = tools.spicial_case(string, spicial_case_vals);
        if (equoation){
            for (let i = 0; i < equoation.length; i++) {
                const element = equoation[i]
                //console.log("|",element,"|");
                if (tools.parsing(element)){
                    tools.GetEqElements(element)
                }
                else{
                    console.error('syntax error in equoation arg: ', "'"+element.trim()+"'");
                    return
                }
            }
        }
    }
    else
        console.log("arg is empty")
}
else
    console.log("error number of params")