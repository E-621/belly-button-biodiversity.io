// Read in sample data
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata= data.metadata;
      var results= metadata.filter(sampleobject => sampleobject.id == sample);
      var result= results[0]
      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
      });

      // BONUS: Build the Gauge Chart
    
    });
  }


function buildCharts(sample) {

  // Read in sample data
  d3.json("samples.json").then((data) => {
    var samples= data.samples;
    var resultsarray= samples.filter(sampleobject => sampleobject.id == sample);
    var result= resultsarray[0]

    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;

    //  Build bar Chart
        var bar_data =[
      {
        y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x:values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
      }
    ];

    var barLayout = {
      title: "Top 10 Microbial Species Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", bar_data, barLayout);


    // Build Bubble Chart
    var bubble_layout = {
      margin: { t: 0 },
      xaxis: { title: "Id's" },
      hovermode: "closest",
      };

      var bubble_data = [
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
          }
      }
    ];

    Plotly.plot("bubble", bubble_data, bubble_layout);  
  });
}
   
 // Initializes page
function init() {
  var selector = d3.select("#selDataset");

  // populate the options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();