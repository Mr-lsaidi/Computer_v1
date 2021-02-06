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
    for (let i = 0; i < equoation.length; i++) {
        const element = equoation[i].trim();
        if (!element){
            equoation.splice(i, 1)
        }
        else{ 
            if (element[element.length - 1] === '-' && !spicial_case_vals.FirstNegativeEq){
                spicial_case_vals.FirstNegativeEq = true
                equoation[i + 1] = equoation[i] + equoation[i + 1]
                equoation.splice(i , 1)
            }
            else if (element[element.length - 1] === '*'){
                if (equoation[i + 1].trim() === '-'){
                    equoation[i] = equoation[i] + equoation[i + 1] + equoation[i + 2]
                    equoation.splice(i + 1, 1)
                    equoation.splice(i + 1, 1)
                }
            }
            else if (element[element.length - 1] === '='){
                if (spicial_case_vals.equoal){
                    console.log("error double =");
                    return -1
                }
                spicial_case_vals.equoal = true
                spicial_case_vals.FirstNegativeEq = false
                if (!equoation[i + 1].trim()){
                    equoation.splice(i + 1, 1)
                }
                if (equoation[i + 1].trim() === '-'){
                    equoation[i] = equoation[i + 1] + equoation[i + 2]
                    equoation.splice(i + 1, 1)
                    equoation.splice(i + 1, 1)
                }
            }
        }
    }
    return (equoation)
}

function GetEqElements(eq_arg) {
    let degree = 0
    let factor = 0
    if (eq_arg.match(/^[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?\*[\ ]?X[\ ]?\^[\ ]?(\d+)[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?\*[\ ]?X[\ ]?\^[\ ]?(\d+)[\ ]?$/);
        console.log('----'+rgx_result[0]+'-----');
        console.log("fact",rgx_result[1]);
        console.log("degree",rgx_result[2]);
        console.log('---------');
        factor = parseFloat(rgx_result[1])
        degree = parseInt(rgx_result[2])
    }
    else if (eq_arg.match(/^[\ ]?X[\ ]?\^[\ ]?(\d+)[\ ]?\*[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?X[\ ]?\^[\ ]?(\d+)[\ ]?\*[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?$/);
        console.log('----'+rgx_result[0]+'-----');
        console.log("fact",rgx_result[2]);
        console.log("degree",rgx_result[1]);
        console.log('---------');
        factor = parseFloat(rgx_result[2])
        degree = parseInt(rgx_result[1])
    }
    else if (eq_arg.match(/^[\ ]?X[\ ]?\^[\ ]?(\d+)[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?X[\ ]?\^[\ ]?(\d+)[\ ]?$/);
        console.log('----'+rgx_result[0]+'-----');
        console.log("fact", 1);
        console.log("degree",rgx_result[1]);
        console.log('---------');
        factor = 1
        degree = parseInt(rgx_result[1])
    }
    else if (eq_arg.match(/^[\ ]?X[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?X[\ ]?$/);
        console.log('----'+rgx_result[0]+'-----');
        console.log("fact", 1);
        console.log("non degree", 1);
        console.log('---------');
        factor = 1
        degree = 1
    }
    else if (eq_arg.match(/^[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?\*[\ ]?X[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?([-]?[0-9]*\.?[0-9]+)[\ ]?\*[\ ]?X[\ ]?$/);
        console.log('----'+rgx_result[0]+'-----');
        console.log("fact", rgx_result[1]);
        console.log("non degree", 1);
        console.log('---------');
        factor = parseFloat(rgx_result[1])
        degree = 1
    }
    else if (eq_arg.match(/^[\ ]?X[\ ]?\*[\ ]?([-]?[0-9]*\.?[0-9])+[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?X[\ ]?\*[\ ]?([-]?[0-9]*\.?[0-9])+[\ ]?$/);
        console.log('----'+rgx_result[0]+'-----');
        console.log("fact", rgx_result[1]);
        console.log("non degree", 1);
        console.log('---------');
        factor = parseFloat(rgx_result[1])
        degree = parseInt(1)
    }
    else if (eq_arg.match(/^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?[-]?[0-9]*\.?[0-9]+[\ ]?$/);
        console.log('----'+rgx_result[0]+'-----');
        console.log("fact", rgx_result[0]);
        console.log("non degree", 0);
        console.log('---------');
        factor = parseFloat(rgx_result[0])
        degree = 0
    }
    else if (eq_arg.match(/^[\ ]?\+[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?\+[\ ]?$/);
        console.log('----'+rgx_result[0]+'-----');
        console.log("sign", rgx_result[0]);
        console.log('---------');
    }
    else if (eq_arg.match(/^[\ ]?\=[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?\=[\ ]?$/);
        console.log('----'+rgx_result[0]+'-----');
        console.log("sign", rgx_result[0]);
        console.log('---------');
    }
    else if (eq_arg.match(/^[\ ]?\-[\ ]?$/g)){
        const rgx_result = eq_arg.match(/^[\ ]?\-[\ ]?$/);
        console.log('----'+rgx_result[0]+'-----');
        console.log("sign", rgx_result[0]);
        console.log('---------');
    }
    else
        console.log("out");

    console.log(factor, degree);
}

module.exports = {
    parsing,
    spicial_case,
    GetEqElements,
}