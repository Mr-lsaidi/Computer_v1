const chalk = require("chalk")

function ABS(val)
{
    if (val < 0)
        val = -val;
    return val;
}

function squareRoot(n) {
    if (!(typeof n === 'number' && n >= 0 && !isNaN(n))) {
      return NaN;
    } else if (n === 0) {
      return 0;
    } else if (n === Infinity) {
      return Infinity;
    }
    var val = n;
    while(true) {
      var last = val;
      val = (val + (n / val)) * 0.5;
      if (ABS(val - last) < 1e-9) {
        break;
      }
    }
    return val;
}

function parsing(eq_arg){
    return eq_arg.match(/((^[\ ]?\+[\ ]?$)|(^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$)|(^[\ ]?\=[\ ]?$)|(^[\ ]?[-]?X[\ ]?$)|(^[\ ]?\-[\ ]?$)|(^[\ ]?X[\ ]?\^[\ ]?\d+[\ ]?$)|(^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?\*[\ ]?X[\ ]?\^[\ ]?\d+[\ ]?$)|(^[\ ]?X[\ ]?\^[\ ]?\d+[\ ]?\*[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$)|(^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?\*[\ ]?[-]?X[\ ]?$)|(^[\ ]?[-]?X[\ ]?\*[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$))/g)
}

function spicial_case(equation, spicial_case_vals, states) {
    let temp = []
    let first_ele = 0
    equation.map(ele=>{
        if (ele !== " ")
            temp.push(ele)
    })
    for (let i = 0; i < temp.length; i++) {
        const element = temp[i]; 
        if (element[element.length - 1] === '-' && !spicial_case_vals.FirstNegativeEq && i === first_ele){
            spicial_case_vals.FirstNegativeEq = true
            temp[i + 1] = temp[i] + temp[i + 1]
            temp.splice(i , 1)
            first_ele = -1
        }
        else if (element[element.length - 1] === '+'){
            if (temp[i + 1]  === '-'){
                temp[i + 2] = temp[i + 1] + temp[i + 2]
                temp.splice(i + 1, 1)
            }
            else if (temp[i + 1]  === '+' || temp[i + 1]  === '+'){
                console.error(chalk.red('syntax error in equation arg1: '), "'"+element+"'");
                states.graph = false
                return
            }
        }
        else if (element[element.length - 1] === '-'){
            if (temp[i + 1]  === '-' || temp[i + 1]  === '+' || temp[i + 1]  === '='){
                console.error(chalk.red('syntax error in equation arg2: '), "'"+element+"'");
                states.graph = false
                return
            }
        }
        else if (element[element.length - 1] === '*'){
            if (temp[i + 1]  === '-'){
                temp[i] = temp[i] + temp[i + 1] + temp[i + 2]
                temp.splice(i + 1, 1)
                temp.splice(i + 1, 1)
            }
        }
        else if (element[element.length - 1] === '='){
            if (temp[i + 1]  === '+'){
                console.error(chalk.red('syntax error in equation arg3: '), "'"+element+"'");
                states.graph = false
                return
            }
            if (spicial_case_vals.equoal){
                console.log(chalk.red("error double ="));
                states.graph = false
                return
            }
            spicial_case_vals.equoal = true
            spicial_case_vals.FirstNegativeEq = false
            first_ele = i + 1
        }
    }
    if (!spicial_case_vals.equoal){
        console.log(chalk.red("no = in the equation"));
        states.graph = false
        return
    }
    return (temp)
}

function GetEqElements(eq_arg, states) {
    if (eq_arg.match(/^[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?\*[\ ]?X[\ ]?\^[\ ]?(\d+)[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?\*[\ ]?X[\ ]?\^[\ ]?(\d+)[\ ]?$/);
        states.factor = parseFloat(rgx_result[1])
        states.degree = parseInt(rgx_result[2])
    }
    else if (eq_arg.match(/^[\ ]?X[\ ]?\^[\ ]?(\d+)[\ ]?\*[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?X[\ ]?\^[\ ]?(\d+)[\ ]?\*[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?$/);
        states.factor = parseFloat(rgx_result[2])
        states.degree = parseInt(rgx_result[1])
    }
    else if (eq_arg.match(/^[\ ]?X[\ ]?\^[\ ]?(\d+)[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?X[\ ]?\^[\ ]?(\d+)[\ ]?$/);
        states.factor = 1
        states.degree = parseInt(rgx_result[1])
    }
    else if (eq_arg.match(/^[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?\*[\ ]?[-]?X[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?\*[\ ]?([-]?)X[\ ]?$/);
        // console.log(rgx_result);
        states.factor = parseFloat(rgx_result[1])
        states.sign = rgx_result[2] ? true : false
        states.degree = 1
    }
    else if (eq_arg.match(/^[\ ]?([-]?)X[\ ]?\*[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?([-]?)X[\ ]?\*[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?$/);
        // console.log(rgx_result);
        states.factor = parseFloat(rgx_result[2])
        states.sign = rgx_result[1] ? true : false
        states.degree = 1
    }
    else if (eq_arg.match(/^[\ ]?([-]?)X[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?([-]?)X[\ ]?$/);
        // console.log(rgx_result);
        states.factor = 1
        states.sign = rgx_result[1] ? true : false
        states.degree = 1
    }
    else if (eq_arg.match(/^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$/);
        states.factor = parseFloat(rgx_result[0])
        states.degree = 0
    }
    else if (eq_arg.match(/^[\ ]?\+[\ ]?$/g)){      
        states.eq_params[states.degree] += states.factor * (states.sign ? -1 : 1) * (states.equoal ? -1 : 1)
        states.sign = false
    }
    else if (eq_arg.match(/^[\ ]?\=[\ ]?$/g)){
        states.equoal = true
        states.eq_params[states.degree] += states.factor * (states.sign ? -1 : 1)
        states.sign = false
    }
    else if (eq_arg.match(/^[\ ]?\-[\ ]?$/g)){
        states.eq_params[states.degree] += states.factor * (states.sign ? -1 : 1)  * (states.equoal ? -1 : 1)
        states.sign = true
    }
    else if (eq_arg.match(/^last$/g)){
        states.eq_params[states.degree] += states.factor * (states.sign ? -1 : 1)  * (states.equoal ? -1 : 1)
    }
    else {
        console.log("option out error");
        states.error = true
    }
    if (states.degree > 2){
        console.log(chalk.dim("The polynomial degree is stricly greater than 2, I can't solve."));
        states.error = true
    }
    if (states.polynomial_degree < states.degree && states.factor)
        states.polynomial_degree = states.degree
}

function Reduced(states){
    let Reduced_form = []
    Reduced_form.push(chalk.dim("Reduced form: "));
    if (states.eq_params[0] != 0)
        Reduced_form.push(`${states.eq_params[0]} * X^0`);
    if (states.eq_params[1] != 0){
        if (states.eq_params[1] >= 0 && states.eq_params[0] != 0)
            Reduced_form.push('+')
        Reduced_form.push(`${states.eq_params[1]} * X^1`)
    }
    if (states.eq_params[2] != 0){
        if (states.eq_params[2] >= 0 && states.eq_params[2] != 0)
            Reduced_form.push('+')
        Reduced_form.push(`${states.eq_params[2]} * X^2`)
    }
    Reduced_form.push("= 0")
    console.log(...Reduced_form);
    states.graph_hand = Reduced_form.slice(1).join(' ')
}

module.exports = {
    parsing,
    spicial_case,
    GetEqElements,
    Reduced,
    squareRoot,
    ABS
}