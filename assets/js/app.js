// @TODO: YOUR CODE HERE!
const svgWidth = 1000;
const svgHeight = 600;

const margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create a SVG wrapper, append an SVG group that will hold our chart
// and shift the later by left and top margins
const svg = d3
    .select('#scatter')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)

// Append an SVG group
const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Parameters

// function used for updating x-scale const upon click on axis label

// create scales for updated graphs

// Obtain data from the CSV file
d3.csv("data.csv").then(function(data) {
    console.log(data);
});