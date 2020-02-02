// @TODO: YOUR CODE HERE!
const svgWidth = 800;
const svgHeight = 600;

const margin = {
    top: 20,
    right: 40,
    bottom: 70,
    left: 60
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

// Obtain data from the CSV file
d3.csv("data.csv").then(function(data) {
    console.log(data);

    // Parse Data/Cast as number
    data.forEach(item => {
        item.poverty = +item.poverty;
        item.healthcare = +item.healthcare;
    });

    // Create Scale Functions
    const povertyScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.poverty))
        .range([0, width]);

    const povertyScaleAxis = d3.scaleLinear()
        .domain(d3.extent(data, d => d.poverty))
        .range([0, width]);    
    console.log(povertyScaleAxis)

    const healthScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.healthcare))
        .range([height, 0]);


    const healthScaleAxis = d3.scaleLinear()
        .domain(d3.extent(data, d => d.healthcare))
        .range([height, 0]);

    // Create axis functions
    const povertyAxis = d3.axisBottom(povertyScaleAxis);
    const healthAxis = d3.axisLeft(healthScaleAxis);

    // Append Axes to the chart
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(povertyAxis);

    chartGroup.append("g")
    .call(healthAxis);

    // Create Circles
    const circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr('id', "textCircles")
        .attr("cx", d => povertyScale(d.poverty) + 8)
        .attr("cy", d => healthScale(d.healthcare) - 5)
        .attr("r", "9")
        .attr("fill", "#3397b1")

    // /* Create the text for each circle */
    chartGroup.selectAll("textCircles")
        .data(data)
        .enter()
        .append("text")
        .attr("transform", function(d) {
            return `translate(${povertyScale(d.poverty)}, ${healthScale(d.healthcare)})`
        })
        .attr("font-size", 10)
        .attr("fill", "white")
        .text(d => d.abbr)

    // Create axis labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - ((height/2) + 50))
        .attr("dy", "1em")
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)")
        

    chartGroup.append("text")
        .attr("transform", `translate(${(width/2) - 80}, ${height + margin.top + 30})`)
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("class", "axisText")
        .text("In Poverty (%)")

    // chartGroup.append("text")
    //     .attr("transform", `translate(${width/2 - 100}, ${30})`)
    //     .attr("fill", "black")
    //     .attr("class", "title")
    //     .attr("font-size", 30)
    //     .text("Correlation of Healthcare to Poverty")
    
});