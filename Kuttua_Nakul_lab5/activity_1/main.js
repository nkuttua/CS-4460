// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    // Get current value of select element
    var category = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letters
    updateChart(category);
}

// recall that when data is loaded into memory, numbers are loaded as strings
// this function helps convert numbers into string during data preprocessing
function dataPreprocessor(row) {
    return {
        letter: row.letter,
        frequency: +row.frequency
    };
}

var svg = d3.select('svg');

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 60, r: 40, b: 30, l: 40};

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

// Compute the spacing for bar bands based on all 26 letters
var barBand = chartHeight / 26;
var barHeight = barBand * 0.7;

// Create a group element for appending chart elements
var chartG = svg.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// A map with arrays for each category of letter sets
var lettersMap = {
    'all-letters': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    'only-consonants': 'BCDFGHJKLMNPQRSTVWXZ'.split(''),
    'only-vowels': 'AEIOUY'.split('')
};

d3.csv('letter_freq.csv', dataPreprocessor).then(function(dataset) {
    // Create global variables here and intialize the chart
    letters = dataset;
    console.log(letters);
    widthScale = d3.scaleLinear()
                .domain([0, 0.13])
                .range([0, chartWidth])

    // **** Your JavaScript code goes here ****
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(40, 40)')
        .call(d3.axisTop(widthScale).ticks(6) .tickFormat(d => (d * 100) + "%"))

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(40, 580)')
        .call(d3.axisBottom(widthScale).ticks(6) .tickFormat(d => (d * 100) + "%"))

    // Update the chart for all letters to initialize
    updateChart('all-letters');
});

function updateChart(filterKey) {
    // Create a filtered array of letters based on the filterKey
    var filteredLetters = letters.filter(function(d){
        return lettersMap[filterKey].indexOf(d.letter) >= 0;
    });

    // **** Draw and Update your chart here ****
    var bars = chartG.selectAll('.bar')
        .data(filteredLetters, function(d) {
            return d.letter;
        });

    var bars2 = bars.enter()
        .append('g')
        .attr('class', 'bar');

    bars2.append('rect')
        .attr('height', barHeight)
        .attr('width', function(d) {
            return widthScale(d.frequency);
        });

    bars2.append('text')
        .attr('x', -20)
        .attr('dy', '0.9em')
        .text(function(d) {
            return d.letter;
        });

    bars.merge(bars2)
        .attr('transform', function(d,i){
            return 'translate(' + [0, (i*barBand) + 4] + ')';
        });

    bars.exit().remove();
}
