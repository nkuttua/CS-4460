var body = d3.select('body');
var svg2 = d3.select('#chart');

var dataStrings = [ { "text" : "duration" },
                    { "text" : "aspect_ratio" },
                    { "text" : "imdb_score" },
                    { "text" : "budget" },
                    { "text" : "gross" },
                    { "text" : "num_user_for_reviews" },
                    { "text" : "facenumber_in_poster" },
                    { "text" : "num_voted_users" }
                    ];

var dataAttributes = ["duration",
                        "gross",
                        "num_voted_users",
                        "facenumber_in_poster",
                        "num_user_for_reviews",
                        "budget",
                        "imdb_score",
                        "aspect_ratio"
];

var years = [   { "value": "All" },
                { "value": 2010 },  
                { "value": 2011 },  
                { "value": 2012 },  
                { "value": 2013 },  
                { "value": 2014 },  
                { "value": 2015 },  
                { "value": 2016 }
            ];

var extentByAttribute = {};

var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-12, 0])
    .html(function(event, d) {
        return "<h5>"+d['movie_title']+d['content_rating']+"</h5>";
    });

d3.csv("movies.csv", dataPreprocessor).then(function(data) {

    dataAttributes.forEach(function(attribute){
        extentByAttribute[attribute] = d3.extent(data, function(d){
            return d[attribute];
        });
    });

    var margin = { top: 50, right: 50, bottom: 50, left: 50 }
    var h = 600 - margin.top - margin.bottom
    var w = 700 - margin.left - margin.right - margin.left
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = body.append('svg')
        .attr('height', h + margin.top + margin.bottom)
        .attr('width', w + margin.left + margin.right + 100)
        .attr('height', 650)
        .attr('width', 750)
        .append('g')
            .attr('transform','translate(' + 70 + ',' + margin.top + ')')

    svg.append("text")
        .attr("x", w / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("Movies Scatterplot");
    
    function drawLegend() {
        svg.append("text")
            .attr("x", w + 75)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .style("text-decoration", "underline")
            .text("Movie Year");
        svg.append("rect")
            .attr("x", w + 45)
            .attr("y", 40)
            .attr("width", 15)
            .attr("height", 15)
            .style("opacity", 0.7)
            .attr("fill", "#d62728");
        svg.append("text")
            .attr("x", w + 85)
            .attr("y", 54)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("2010");

        svg.append("rect")
            .attr("x", w + 45)
            .attr("y", 60)
            .attr("width", 15)
            .attr("height", 15)
            .style("opacity", 0.7)
            .attr("fill", "#1f77b4");
        svg.append("text")
            .attr("x", w + 85)
            .attr("y", 74)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("2011");

        svg.append("rect")
            .attr("x", w + 45)
            .attr("y", 80)
            .attr("width", 15)
            .attr("height", 15)
            .style("opacity", 0.7)
            .attr("fill", "#8c564b");
        svg.append("text")
            .attr("x", w + 85)
            .attr("y", 94)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("2012");

        svg.append("rect")
            .attr("x", w + 45)
            .attr("y", 100)
            .attr("width", 15)
            .attr("height", 15)
            .style("opacity", 0.7)
            .attr("fill", "#9467bd");
        svg.append("text")
            .attr("x", w + 85)
            .attr("y", 114)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("2013");

        svg.append("rect")
            .attr("x", w + 45)
            .attr("y", 120)
            .attr("width", 15)
            .attr("height", 15)
            .style("opacity", 0.7)
            .attr("fill", "#2ca02c");
        svg.append("text")
            .attr("x", w + 85)
            .attr("y", 134)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("2014");

        svg.append("rect")
            .attr("x", w + 45)
            .attr("y", 140)
            .attr("width", 15)
            .attr("height", 15)
            .style("opacity", 0.7)
            .attr("fill", "#ff7f0e");
        svg.append("text")
            .attr("x", w + 85)
            .attr("y", 154)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("2015");

        svg.append("rect")
            .attr("x", w + 45)
            .attr("y", 160)
            .attr("width", 15)
            .attr("height", 15)
            .style("opacity", 0.7)
            .attr("fill", "#e377c2");
        svg.append("text")
            .attr("x", w + 85)
            .attr("y", 174)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("2016");
    }
    drawLegend();

    function drawDropDowns() {
        body.append('br')
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
                    if (d.text == "duration") {
                        return 'Duration';
                    } else if (d.text == "aspect_ratio") {
                        return 'Aspect Ratio';
                    } else if (d.text == "imdb_score") {
                        return 'IMDB Score';
                    } else if (d.text == "budget") {
                        return 'Budget';
                    } else if (d.text == "gross") {
                        return 'Gross';
                    } else if (d.text == "num_user_for_reviews") {
                        return 'Number of Users for Reviews';
                    } else if (d.text == "facenumber_in_poster") {
                        return 'Number of Faces in Poster';
                    } else if (d.text == "num_voted_users") {
                        return 'Number of Voted Users';
                    }
                })
                .property('selected', function(d) { 
                    return d.text === 'duration'; 
                });

        var span = body.append('span')
            .text(' Y-Axis: ')
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
                    if (d.text == "duration") {
                        return 'Duration';
                    } else if (d.text == "aspect_ratio") {
                        return 'Aspect Ratio';
                    } else if (d.text == "imdb_score") {
                        return 'IMDB Score';
                    } else if (d.text == "budget") {
                        return 'Budget';
                    } else if (d.text == "gross") {
                        return 'Gross';
                    } else if (d.text == "num_user_for_reviews") {
                        return 'Number of Users for Reviews';
                    } else if (d.text == "facenumber_in_poster") {
                        return 'Number of Faces in Poster';
                    } else if (d.text == "num_voted_users") {
                        return 'Number of Voted Users';
                    }
                })
                .property('selected', function(d) { 
                    return d.text === 'imdb_score';
                });
        
        var span = body.append('span')
                .text(' Year Filter: ')
        var yearInput = body.append('select')
            .attr('id','yearSelect')
            .selectAll('option')
            .data(years)
            .enter()
            .append('option')
                .attr('value', function (d) { 
                    return d.value;
                })
                .text(function (d) { 
                    return d.value;
                })
                .property('selected', function(d) {
                    return d.value === "All" ? true : null; 
                });
                body.append('br')
        
    }
    drawDropDowns();
    
    function drawAxes() {

        svg.append("line")
        .attr("x1", 0)
        .attr("y1", h)
        .attr("x2", w)
        .attr("y2", h)
        .attr("stroke", "black");

        svg.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", h)
        .attr("stroke", "black");

        // X-axis
        svg.append('g')
            .attr('class','axis')
            .attr('id','xAxis')
            .attr('transform', 'translate(0,' + h + ')')
            .call(xAxis)
    
        // Y-axis
        svg.append('g')
            .attr('class','axis')
            .attr('id','yAxis')
            .call(yAxis)
    }

    var xScale = d3.scaleLinear()
        .domain(extentByAttribute[d3.select("#xSelect").node().value])
        .range([0, w]);
    var yScale = d3.scaleLinear()
        .domain(extentByAttribute[d3.select("#ySelect").node().value])
        .range([h, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    var circles = svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr("class", function(d) {
        return "dot year" + d.title_year;
    })
    .attr('cx',function (d) { 
        return xScale(d[d3.select("#xSelect").node().value]) 
    })
    .attr('cy',function (d) { 
        return yScale(d[d3.select("#ySelect").node().value]) 
    })
    .attr('r','4')
    .attr('fill',function (d) {
        return colorScale(d.title_year); 
    })
    .on('mouseover', toolTip.show)
    .on('mouseout', toolTip.hide)
    .on('click', showDotData)
    .on('dblclick', function closeBarGraph() {
        svg2.selectAll("text").remove();
        svg2.selectAll("g").remove();
    })

    drawAxes();

    var margin2 = { top: 20, right: 50, bottom: 100, left: 50 };
    var width2 = 500;
    var height2 = 500;
    var colorScale2 = d3.scaleOrdinal(d3.schemeCategory10);
    var svg2 = body.append('svg')
        .attr('height', 600)
        .attr('width', 640)
        .attr('transform','translate(' + 725 + ',' + -620 + ')')

    function showDotData(event, d) {

        svg2.selectAll("text").remove();
        svg2.selectAll("g").remove();

        var barChartData = [
            { label: "Actor 1 Facebook Likes", value : d.actor_1_facebook_likes},
            { label: "Actor 2 Facebook Likes", value : d.actor_2_facebook_likes},
            { label: "Actor 3 Facebook Likes", value : d.actor_3_facebook_likes},
            { label: "Director Facebook Likes", value : d.director_facebook_likes},
            { label: "Cast Facebook Likes", value : d.cast_total_facebook_likes},
            { label: "Movie Facebook Likes", value : d.movie_facebook_likes},
        ];
        
        svg2.append('text')
            .attr("x", 375)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .style("font-weight", "bold")
            .text(d.movie_title);
        
        var barChartContainer = svg2.append("g");
        
        var barXScale = d3.scaleLinear()
            .domain([0, d3.max(barChartData, d => d.value)])
            .range([0, width2]);
        
        var barYScale = d3.scaleBand()
            .domain(barChartData.map(d => d.label))
            .range([0, height2])
            .padding(0.1);
        
        barChartContainer.selectAll("rect")
            .data(barChartData)
            .enter()
            .append("rect")
            .attr("x", 116)
            .attr("y", d => barYScale(d.label) + 10)
            .attr("width", d => barXScale(d.value))
            .attr("height", barYScale.bandwidth())
            .attr("fill", "#18345c");

        barChartContainer.append("g")
            .attr("transform", "translate(116," + height2 + ")")
            .call(d3.axisBottom(barXScale));
        
        barChartContainer.append("g")
        .attr("transform", "translate(116," + 0 + ")")
            .call(d3.axisLeft(barYScale));

    }

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
                return xScale(d[value]);
            })
    }

    d3.select("#yearSelect").on("change", function() {
        var selectedYear = d3.select(this).property("value");
        if (selectedYear == "All") {
            circles.filter(".year" + 2010)
                .attr("display", "block");
            circles.filter(".year" + 2011)
                .attr("display", "block");
            circles.filter(".year" + 2012)
                .attr("display", "block");
            circles.filter(".year" + 2013)
                .attr("display", "block");
            circles.filter(".year" + 2014)
                .attr("display", "block");
            circles.filter(".year" + 2015)
                .attr("display", "block");
            circles.filter(".year" + 2016)
                .attr("display", "block");
        } else {
            circles.filter(".year" + selectedYear)
            .attr("display", "block");
            circles.filter(":not(.year" + selectedYear + ")")
            .attr("display", "none");
        }
    });

    svg.call(toolTip);
});

function dataPreprocessor(row) {
    return {
        'color': row['color'],
        'director_name': row['director_name'],
        'num_critic_for_reviews': +row['num_critic_for_reviews'],
        'duration': +row['duration'],
        'director_facebook_likes': +row['director_facebook_likes'],
        'actor_3_facebook_likes': +row['actor_3_facebook_likes'],
        'actor_2_name': row['actor_2_name'],
        'actor_1_facebook_likes': +row['actor_1_facebook_likes'],
        'gross': +row['gross'],
        'genres': row['genres'],
        'actor_1_name': row['actor_1_name'],
        'movie_title': row['movie_title'],
        'num_voted_users': +row['num_voted_users'],
        'cast_total_facebook_likes': +row['cast_total_facebook_likes'],
        'facenumber_in_poster': +row['facenumber_in_poster'],
        'plot_keywords': row['plot_keywords'],
        'movie_imdb_link': row['movie_imdb_link'],
        'num_user_for_reviews': +row['num_user_for_reviews'],
        'language': row['language'],
        'country': row['country'],
        'content_rating': row['content_rating'],
        'budget': +row['budget'],
        'title_year': +row['title_year'],
        'actor_2_facebook_likes': +row['actor_2_facebook_likes'],
        'imdb_score': +row['imdb_score'],
        'aspect_ratio': +row['aspect_ratio'],
        'movie_facebook_likes': +row['movie_facebook_likes']
    };
}