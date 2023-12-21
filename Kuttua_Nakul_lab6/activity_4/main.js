var svg = d3.select('svg');
var svg2 = d3.select('#chart');
var body = d3.select('body')

var margin = { top: 50, right: 50, bottom: 50, left: 50 }
var h = 500 - margin.top - margin.bottom
var w = 500 - margin.left - margin.right
var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

var margin2 = { top: 20, right: 50, bottom: 100, left: 50 };
var width2 = 500;
var height2 = 500;
var colorScale2 = d3.scaleOrdinal(d3.schemeCategory10);
var brushCell;

var dataStrings = [ { "text" : "economy (mpg)" }, { "text" : "cylinders" },
                    { "text" : "displacement (cc)" }, { "text" : "power (hp)" },
                    { "text" : "weight (lb)" }, { "text" : "0-60 mph (s)" }, { "text" : "year" }];
var dataAttributes = ['economy (mpg)', 'cylinders', 'displacement (cc)', 'power (hp)', 'weight (lb)', '0-60 mph (s)', 'year'];
var extentByAttribute = {};

d3.csv('cars.csv', dataPreprocessor).then(function(data) {

    // Scatterplot Code
    dataAttributes.forEach(function(attribute){
        extentByAttribute[attribute] = d3.extent(data, function(d){
            return d[attribute];
        });
    });

    var span = body.append('span')
        .text('X-Axis: ')
    var xInput = body.append('select')
        .attr('id','xSelect')
        .on('change',xChange)
        .selectAll('option')
        .data(dataStrings)
        .enter()
        .append('option')
            .attr('value', function (d) { 
                return d.text;
            })
            .text(function (d) { 
                return d.text;
            })
            .property('selected', function(d) { 
                return d.text === 'cylinders'; 
            });
    body.append('br')

    var span = body.append('span')
        .text('Y-Axis: ')
    var yInput = body.append('select')
        .attr('id','ySelect')
        .on('change',yChange)
        .selectAll('option')
        .data(dataStrings)
        .enter()
        .append('option')
            .attr('value', function (d) { 
                return d.text;
            })
            .text(function (d) { 
                return d.text;
            })
            .property('selected', function(d) { 
                return d.text === 'economy (mpg)'; 
            });
    body.append('br')

    var xScale = d3.scaleLinear()
        .domain(extentByAttribute['cylinders'])
        .range([0, w]);
    var yScale = d3.scaleLinear()
        .domain(extentByAttribute['economy (mpg)'])
        .range([h, 0]);

    var svg = body.append('svg')
        .attr('height', h + margin.top + margin.bottom)
        .attr('width', w + margin.left + margin.right)
        .append('g')
            .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

    var circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx',function (d) { 
            return xScale(d['cylinders']) 
        })
        .attr('cy',function (d) { 
            return yScale(d['economy (mpg)']) 
        })
        .attr('r','4')
        .attr('fill',function (d) { 
            return colorScale(d.cylinders); 
        })

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // X-axis
    svg.append('g')
        .attr('class','axis')
        .attr('id','xAxis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)
        .append('text') // X-axis Label
            .attr('id','xAxisLabel')
            .attr('y', 30)
            .attr('x', w)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .style('fill', 'black')
            .style("font-size", "15px")
            .text('cylinders')
    // Y-axis
    svg.append('g')
        .attr('class','axis')
        .attr('id','yAxis')
        .call(yAxis)
        .append('text') // Y-axis Label
            .attr('id', 'yAxisLabel')
            .attr('transform','rotate(-90)')
            .attr('x',0)
            .attr('y',-50)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .style('fill', 'black')
            .style("font-size", "15px")
            .text('economy (mpg)')

    function yChange() {
        var value = this.value
        yScale
            .domain([
                d3.min([0,d3.min(data,function (d) { 
                    return d[value] 
                })]),
                d3.max([0,d3.max(data,function (d) { 
                    return d[value] 
                })])
                ])
        yAxis.scale(yScale)
        d3.select('#yAxis')
        .call(yAxis)
        d3.select('#yAxisLabel') 
        .text(value)    
        d3.selectAll('circle')
            .attr('cy',function (d) { 
                return yScale(d[value]) 
            })
    }
            
    function xChange() {
        var value = this.value
        xScale
        .domain([
            d3.min([0,d3.min(data,function (d) { 
                return d[value] 
            })]),
            d3.max([0,d3.max(data,function (d) { 
                return d[value] 
            })])
            ])
        xAxis.scale(xScale)
        d3.select('#xAxis')
        .call(xAxis)
        d3.select('#xAxisLabel')
        .text(value)
        d3.selectAll('circle')
            .attr('cx',function (d) { 
                return xScale(d[value]) 
            })
    
    }

        var brush = d3.brush()
        .extent([[0, 0], [500, 500]])
        .on("start", brushstart)
        .on("brush", brushmove)
        .on("end", brushend);

        function brushstart(event) {
        if(brushCell !== this) {

            brush.move(d3.select(brushCell), null);
            xScale.domain(extentByAttribute[d3.select("#xSelect").node().value]);
            yScale.domain(extentByAttribute[d3.select("#ySelect").node().value]);

            brushCell = this;
        }
        }
        function brushmove(event) {
        var e = event.selection;
        if(e) {
            svg.selectAll(".dot")
                .classed("hidden", function(d) {
                return e[0][0] > xScale(d[d3.select("#xSelect").node().value]) - 10 || xScale(d[d3.select("#xSelect").node().value]) > e[1][0]
                || e[0][1] > yScale(d[d3.select("#ySelect").node().value]) || yScale(d[d3.select("#ySelect").node().value]) > e[1][1];
            })

            var allDots = document.querySelectorAll("circle.dot"); // get all the dots on the scatterplot
            var hiddenDots = document.querySelectorAll("circle.dot.hidden"); // get all the dots that are hidden
            var allDotsArray = Array.from(allDots); // convert the allDots into Array form
            var hiddenDotsArray = Array.from(hiddenDots); // convert the hiddenDots into Array form
            // create a new array that has the visible dots
            var newArray = allDotsArray.filter(function(element) {
                return !hiddenDotsArray.includes(element);
            });
            // create an array that just gets the colors of the visible dots
            var fillColors = Array.from(newArray).map(function(circle) {
                return circle.getAttribute("fill");
            });
            
            var bars = d3.select("#chart").selectAll("rect"); // get all the rects from the histogram
            var bars2 = bars.filter(".bar"); // filter for just the bars in the histogram

            // function that only colors the bars that have their colors visible on the scatterplot
            bars2.attr("fill", function(d, i) {
                if (fillColors.includes(colorScale2(counts2[i].key))) {
                  return colorScale2(counts2[i].key);
                } else {
                  return "#ccc";
                }
            });
        }
        }
        function brushend(event) {
        if(!event.selection) {
            svg.selectAll('.hidden').classed('hidden', false);
            svg2.selectAll('.bar').attr('fill', function(d, i) {
                return colorScale2(counts2[i].key);
            });
            brushCell = undefined;
        }
        }

    svg.call(brush);

    // Histogram Code

    var groups = d3.group(data, (d) => d.cylinders);
    var counts = Array.from(groups, ([key, values]) => ({ key, count: values.length }));
    var counts2 = [];
    counts2[0] = counts[4]; // 3
    counts2[1] = counts[2]; // 4
    counts2[2] = counts[3]; // 5
    counts2[3] = counts[1]; // 6
    counts2[4] = {key: '7', count: 0}; // 7
    counts2[5] = counts[0]; // 8

    var svg2 = d3
        .select("#chart")
        .append("svg")
        .attr("width", width2 + margin2.left + margin2.right)
        .attr("height", height2 + margin2.top + margin2.bottom)
        .append("g")
        .attr("transform", `translate(${margin2.left},${margin2.top})`);

    // X and Y scales
    var x = d3.scaleBand().domain(counts2.map((d) => d.key)).range([0, width2]).padding(0.1);
    var y = d3.scaleLinear().domain([0, d3.max(counts2, (d) => d.count)]).nice().range([height2, 0]);

    //X and Y axes
    svg2
        .append("g")
        .attr("transform", `translate(0,${height2})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    svg2.append("g").call(d3.axisLeft(y));

    svg2
        .selectAll("bar")
        .data(counts)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr("x", function(d) {
            return x(d.key);
        })
        .attr("y", (d) => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height2 - y(d.count))
        .attr('fill',function (d, i) { 
            return colorScale2(counts2[i].key); 
        });

    svg2
        .append('text') // Y-axis Label
        .attr('id', 'yBarAxis')
        .attr('transform','rotate(-90)')
        .attr('x',-250)
        .attr('y',-40)
        .attr('dy','.71em')
        .style('text-anchor','end')
        .style('fill', 'black')
        .style("font-size", "15px")
        .text('Count')

    svg2
        .append('text') // X-axis Label
        .attr('id','xBarAxis')
        .attr('y', 510)
        .attr('x', 280)
        .attr('dy','.71em')
        .style('text-anchor','end')
        .style('fill', 'black')
        .style("font-size", "15px")
        .text('Cylinders')

    svg2.call(brush);
});

function dataPreprocessor(row) {
    return {
        'name': row['name'],
        'economy (mpg)': +row['economy (mpg)'],
        'cylinders': +row['cylinders'],
        'displacement (cc)': +row['displacement (cc)'],
        'power (hp)': +row['power (hp)'],
        'weight (lb)': +row['weight (lb)'],
        '0-60 mph (s)': +row['0-60 mph (s)'],
        'year': +row['year']
    };
}