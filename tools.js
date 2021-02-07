function parsing(eq_arg){

    //((^[\ ]?X[\ ]?\^[\ ]?\d+[\ ]?$)    =>   (X ^ 1)
    //|(^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?\*[\ ]?X[\ ]?\^[\ ]?\d+[\ ]?$)  ==> (1 * X ^1)
    //|(^[\ ]?X[\ ]?\^[\ ]?\d+[\ ]?\*[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$)  ==> (X ^ 1 * 1)
    //|(^[\ ]?\+[\ ]?$)  ==> (+)
    //|(^[\ ]?\=[\ ]?$)  ==> (=)
    //|(^[\ ]?\-[\ ]?$)  ==> (-)
    //|(^[\ ]?X[\ ]?$)   ==> (X)
    //|(^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?\*[\ ]?X[\ ]?$)  ==> (1 * X)
    //|(^[\ ]?X[\ ]?\*[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$)  ==> (X * 1)
    //|(^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$))  ===> (1)

    return eq_arg.match(/((^[\ ]?\+[\ ]?$)|(^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$)|(^[\ ]?\=[\ ]?$)|(^[\ ]?X[\ ]?$)|(^[\ ]?\-[\ ]?$)|(^[\ ]?X[\ ]?\^[\ ]?\d+[\ ]?$)|(^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?\*[\ ]?X[\ ]?\^[\ ]?\d+[\ ]?$)|(^[\ ]?X[\ ]?\^[\ ]?\d+[\ ]?\*[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$)|(^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?\*[\ ]?X[\ ]?$)|(^[\ ]?X[\ ]?\*[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$))/g)
}

function spicial_case(equoation, spicial_case_vals) {
    let temp = []
    let first_ele = 0
    equoation.map(ele=>{
        if (ele !== " ")
            temp.push(ele)
    })
    for (let i = 0; i < temp.length; i++) {
        const element = temp[i].trim(); 
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
            else if (temp[i + 1]  === '+'){
                console.error('syntax error in equoation arg: ', "'"+element.trim()+"'");
                return
            }
        }
        else if (element[element.length - 1] === '-'){
            if (temp[i + 1]  === '-' || temp[i + 1]  === '+'){
                console.error('syntax error in equoation arg: ', "'"+element.trim()+"'");
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
            if (spicial_case_vals.equoal){
                console.log("error double =");
                return
            }
            spicial_case_vals.equoal = true
            spicial_case_vals.FirstNegativeEq = false
            first_ele = i + 1
        }
    }
    if (!spicial_case_vals.equoal){
        console.log("no = in the equoation");
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
    else if (eq_arg.match(/^[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?\*[\ ]?X[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?\*[\ ]?X[\ ]?$/);
        states.factor = parseFloat(rgx_result[1])
        states.degree = 1
    }
    else if (eq_arg.match(/^[\ ]?X[\ ]?\*[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?X[\ ]?\*[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?$/);
        states.factor = parseFloat(rgx_result[1])
        states.degree = 1
    }
    else if (eq_arg.match(/^[\ ]?X[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?X[\ ]?$/);
        states.factor = 1
        states.degree = 1
    }
    else if (eq_arg.match(/^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$/);
        states.factor = parseFloat(rgx_result[0])
        states.degree = 0
    }
    else if (eq_arg.match(/^[\ ]?\+[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?\+[\ ]?$/);        
        states.eq_params[states.degree] += states.factor * (states.sign ? -1 : 1) * (states.equoal ? -1 : 1)
        states.sign = false
       // console.log('+', states);
    }
    else if (eq_arg.match(/^[\ ]?\=[\ ]?$/g)){
        states.equoal = true
        const rgx_result = eq_arg.match(/^[\ ]?\=[\ ]?$/);
        states.eq_params[states.degree] += states.factor * (states.sign ? -1 : 1)
        states.sign = false
        //console.log('=',states);
    }
    else if (eq_arg.match(/^[\ ]?\-[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?\-[\ ]?$/);
        states.eq_params[states.degree] += states.factor * (states.sign ? -1 : 1)  * (states.equoal ? -1 : 1)
        states.sign = true
        //console.log('-', states);
    }
    else if (eq_arg.match(/^last$/g)){
        states.eq_params[states.degree] += states.factor * (states.sign ? -1 : 1)  * (states.equoal ? -1 : 1)
    }
    else
        console.log("out");
    if (states.degree > 2){
        console.log("The polynomial degree is stricly greater than 2, I can't solve.");
        states.error = true
    }
    if (states.polynomial_degree < states.degree)
        states.polynomial_degree = states.degree
}

function Reduced(value){
    res = ""
    if (value < 0)
        res = ' - '+value.toString().slice(1)
    else
        res = ' + ' +value.toString()
    return res
}

module.exports = {
    parsing,
    spicial_case,
    GetEqElements,
    Reduced,
}