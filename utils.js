function regex_element(elem, state, spicial_case_vals) {
  //   console.log(`|${elem}|`, spicial_case_vals.FirstNegativeEq);
  if (spicial_case_vals.FirstNegativeEq) {
    console.log(`nigative ${elem}`);
  } else {
    console.log(elem);
  }
}

function shift_array(string, spicial_case_vals, state) {
  const rest = [];
  if (string[0] === "-") {
    spicial_case_vals.FirstNegativeEq = true;
  }

  for (let i = 0; i < string.length; i++) {
    const elem = string[i];
    if (spicial_case_vals.equoal && elem === "-") {
      spicial_case_vals.FirstNegativeEq = true;
      spicial_case_vals.equoal = false;
    }
    if (elem === "=") {
      spicial_case_vals.equoal = true;
      state.equoal = true;
    }
    console.log(`|${elem}|`, spicial_case_vals.FirstNegativeEq);
    rest.push(spicial_case_vals.FirstNegativeEq ? `-${elem}` : elem);
    spicial_case_vals.FirstNegativeEq = false;
  }
  return rest;
}

function GetEquoation(string, spicial_case_vals, state) {
  const equoation = shift_array(string, spicial_case_vals, state);
  console.log(equoation);
}

module.exports = {
  GetEquoation,
};
