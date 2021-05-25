function buildMetadata(sample) {
    d3.json("samples.json").then((datatiger) => {
      let metadata = datatiger.metadata;
      // Filter the data for the object with the desired sample number: sample, for example 940
      let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
      console.log(resultArray);
      console.log(result);
      // Use d3 to select the panel with id of `#sample-metadata`, this is the panel under Demographic Info
      let PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair in result above to the panel
      // Inside the loop, use d3 to append new tags for each key-value in the metadata.
      // Below addes info to the Demographc Info Panel 
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
      // BONUS: Build the Gauge Chart. result.wfreq pass to function buildGauge()
      buildGauge(result.wfreq);
      console.log(result.wfreq);
    });
  }

// Use 940 as a test for function buildMetadata() above
// buildMetadata(940);
  
  
  
function buildCharts(sample) {
    d3.json("samples.json").then((datatiger) => {
        let samples = datatiger.samples;
        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        console.log(resultArray);
        console.log(result);
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values);
        // Build a Bubble Chart
        let bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
        };
        let bubbleData = [
        {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
            }
        }
        ];
        // It corresponds to the bubble div in html 
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
        
        // Build a horizental Bar Chart, plotly builds from from bottom to top, in order to have highest value on top, need to .reverse()
        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        let barData = [
        {
            y: yticks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        }
        ];
        let barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
        };
        // It corresponds to the bar div in html
        Plotly.newPlot("bar", barData, barLayout);
    });
}
  
  


function init() {
    // Grab the #selDataset reference to the dropdown select element
    let selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Codes below are adding options for line 25 in html, for example <option value="941">941</option> !!!
    d3.json("samples.json").then((datatiger) => {
        let sampleNames = datatiger.names;
        sampleNames.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots which is 940, like default when openning the page
        let firstSample = sampleNames[0];
        console.log(sampleNames);
        console.log(firstSample);
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}
  
  
  
  

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Initialize the dashboard
init();
