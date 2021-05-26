/**
 * BONUS Solution
 * */
function buildGauge(wfreq) {
    let data = [
       {
        domain: {x: [0, 1], y: [0, 1]}, 
        value: wfreq,
        title: {text: "Belly Button Washing Frequency Scrubs Per Week", font: {size: 16}},
        type: "indicator", mode: "gauge+number+delta",
        delta: {reference: 9, increasing: {color: "green"}},
        gauge: {
            axis: {range: [0, 10]}, 
            steps: [
                {range: [0, 5], color: "lightgray"},
                {range: [5, 8], color: "gray"}], 
            threshold: {
                line: {color: "red", width: 4},
                thickness: 0.75, 
                value: 9}
        }
      }
    ];

    let gaugeLayout = {
        width: 400, 
        height: 600, 
        margin: {t: 0, b: 0}
    };


    Plotly.newPlot("gauge", data, gaugeLayout);
}






// /**
//  * BONUS Solution, below is another method using path
//  * */
//  function buildGauge(wfreq) {
//     // Enter the washing frequency between 0 and 180
//     let level = parseFloat(wfreq) * 20;

//     // Trig to calc meter point
//     let degrees = 180 - level;
//     let radius = 0.5;
//     let radians = (degrees * Math.PI) / 180;
//     let x = radius * Math.cos(radians);
//     let y = radius * Math.sin(radians);

//     // Path: may have to change to create a better triangle
//     let mainPath = "M -.0 -0.05 L .0 0.05 L ";
//     let pathX = String(x);
//     let space = " ";
//     let pathY = String(y);
//     let pathEnd = " Z";
//     let path = mainPath.concat(pathX, space, pathY, pathEnd);
//     console.log(path);
    
//     let data = [
//     {
//         type: "scatter",
//         x: [0],
//         y: [0],
//         marker: { size: 12, color: "850000" },
//         showlegend: false,
//         name: "Freq",
//         text: level,
//         hoverinfo: "text+name"
//     },
//     {
//         values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
//         rotation: 90,
//         text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
//         textinfo: "text",
//         textposition: "inside",
//         marker: {
//         colors: [
//             "rgba(0, 105, 11, .5)",
//             "rgba(10, 120, 22, .5)",
//             "rgba(14, 127, 0, .5)",
//             "rgba(110, 154, 22, .5)",
//             "rgba(170, 202, 42, .5)",
//             "rgba(202, 209, 95, .5)",
//             "rgba(210, 206, 145, .5)",
//             "rgba(232, 226, 202, .5)",
//             "rgba(240, 230, 215, .5)",
//             "rgba(255, 255, 255, 0)"
//         ]
//         },
//         labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
//         hoverinfo: "label",
//         hole: 0.5,
//         type: "pie",
//         showlegend: false
//     }
//     ];

//     let layout = {
//     shapes: [
//         {
//         type: "path",
//         path: path,
//         fillcolor: "850000",
//         line: {
//             color: "850000"
//         }
//         }
//     ],
//     title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
//     height: 500,
//     width: 500,
//     xaxis: {
//         zeroline: false,
//         showticklabels: false,
//         showgrid: false,
//         range: [-1, 1]
//     },
//     yaxis: {
//         zeroline: false,
//         showticklabels: false,
//         showgrid: false,
//         range: [-1, 1]
//     }
//     };

//     let GAUGE = document.getElementById("gauge");
//     Plotly.newPlot(GAUGE, data, layout);
// }
  