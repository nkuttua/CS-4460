
// **** Your JavaScript code goes here ****
d3.csv('baseball_hr_leaders_2017.csv').then(function(dataset) {
    var myVar = d3.select('#homerun-leaders').selectAll('p')
                .data(dataset)
                .enter()
                .append('p')
                .text(function(d, i) { 
                    return dataset[i].name + " with " + dataset[i].homeruns + " home runs";
                })
                .style('font-weight', function(d) {
                    return d.name == 'Giancarlo Stanton' ? 'bold' : 'normal';
                });
    // myVar is a variable that selects the #homerun-leaders DOM element
    // and then it selects all the p tags (which doesn't exist yet)
    // in there, the data we will add is the dataset
    // enter it in
    // for each element in the dataset, append a 'p' tag for it
    // and the text that will go in is a function
    // the function will return "name" with "homeruns"
    // finally add a style that has a function where if the name matches Giancarlo Stanton, make it bold

    var myVar2 = d3.select('#homerun-table').select('tbody').selectAll('tr')
                .data(dataset)
                .enter()
                .append('tr');
        myVar2.append('td')
                .style('text-align','center')
                .text(function(d){
                    return d.rank;
                });
        myVar2.append('td')
                .text(function(d){
                    return d.name;
                });
        myVar2.append('td')
                .style('text-align','center')
                .text(function(d){
                    return d.homeruns;
                });
    // myVar2 is a variable that selects the #homerun-table DOM element
    // and then it selects all the tr tags (which doesn't exist yet)
    // in there, the data we will add is the dataset
    // enter it in
    // append a 'tr' tag and style accordingly
    // for the text, create a function that returns a certain variable of the dataset
});