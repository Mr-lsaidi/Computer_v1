import functionPlot from "function-plot";

let contentsBounds = document.body.getBoundingClientRect();
let width = 800;
let height = 500;
let ratio = contentsBounds.width / width;
width *= ratio;
height *= ratio;

functionPlot({
  target: "#root",
  width,
  height,
  yAxis: { domain: [-1, 9] },
  data: [
    {
      fn: "5 * x^0 + 4 * x^1 - 9.3 * x^2",
      derivative: {
        fn: "1 * x^0"
      }
    }
  ]
});
