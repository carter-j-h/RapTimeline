(function (){
data = [
        {date: new Date(1980, 0, 0), text: '1'},
        {date: new Date(1985, 0, 0), text: '2'},
        {date: new Date(1990, 0, 0), text: '3'},
        {date: new Date(1992, 0, 0), text: '4'},
        {date: new Date(2000, 0, 0), text: '5'}
    ]
var h = [
            Math.floor(Math.random() * 20) + 10,
            Math.floor(Math.random() * 20) + 10,
            Math.floor(Math.random() * 20) + 10,
            Math.floor(Math.random() * 20) + 10,
            Math.floor(Math.random() * 20) + 10,
            Math.floor(Math.random() * 20) + 10
        ]

var margin = {top: 10, right: 10, bottom: 30, left: 10};
 width = $('.timeline').width() - margin.left - margin.right;
var height = 150 - margin.top - margin.bottom;

// Define Scales
var x = d3.time.scale()
    //.domain(d3.extent(data, function (d){ return d.date; }))
    .domain([new Date(1975,0,0), new Date(2010, 0, 0)])
    .range([margin.left, width-margin.right]);

var y = d3.scale.linear()
    .domain([0, 1])
    .range([height, 0]);

var zoom = d3.behavior.zoom().scaleExtent([1, 1])
    .x(x)
    .on('zoom', zoomed)

var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(10)
    .innerTickSize(8)
    .orient('bottom');

var xMiniAxis = d3.svg.axis()
    .scale(x)
    .ticks(60)
    .tickFormat('')
    .innerTickSize(4)
    .orient('bottom');

var svg = d3.select('.timeline')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
   	.call(zoom)
    .append('g')
    .attr('class', 'background')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Add a lightgrey background to the SVG.
var background = svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'lightgrey')

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

svg.append('g')
    .attr('class', 'x axis mini')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xMiniAxis)

var breakouts = svg.append('g')
    .attr('class', 'breakouts')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'breakout')

breakouts.append('line')
    .attr('class', 'breakout')
    .attr('x1', function (d){ return x(d.date) })
    .attr('x2', function (d){ return x(d.date) })
    .attr('y1', y(0))
    .attr('y2', y(1))
    .style('stroke', 'white')
    .attr('stroke-width', 1.5)

var rects = breakouts.append('rect')
    .attr('x', function (d){ return x(d.date) })
    .attr('y', function (d, i){ return h[i] })
    .attr('class', 'content')
    .attr('width', 110)
    .attr('height', 70)
    .attr('fill', 'white')

breakouts.append('text')
    .attr('x', function (d){ return x(d.date) + 4 })
    .attr('y', function (d, i){ return h[i] + 10; })
    .attr('dy', '.35em')
    .attr('fill', 'black')
    .text(function(d) { return d.text; })

rects
    .on('mouseover', function(d) {

        var breakout = this.parentNode
        breakout.parentNode.appendChild(breakout)
    })

breakouts
    .on('mouseover', function(d) {
        d3.select(this)
            .select('line')
            .style('stroke', 'black')
    })
    .on('mouseout', function(d) {
        d3.select(this)
            .select('line')
            .style('stroke', 'white')
    })

breakouts
    .on('click', function(d) {
        location.hash = d.text

        d3.select(this.parentNode)
            .selectAll('g.breakout')
            .classed('selected', false)
            .select('text')
            .attr('fill', 'black')

        d3.select(this)
            .classed('selected', true)
            .select('text')
            .attr('fill', 'blue')
    })

function zoomed() {
    var t = zoom.translate();
    var tx = t[0];

    // Dates don't matter just time difference
    tx = Math.min(tx, x(new Date(2020, 0, 0)) - x(new Date(2010, 0, 0)));
    tx = Math.max(tx, x(new Date(2010, 0, 0)) - x(new Date(2020, 0, 0)))

    zoom.translate([tx, 0]);

    svg.select(".x.axis").call(xAxis);
    svg.select(".x.axis.mini").call(xMiniAxis);
    breakouts.attr('transform', 'translate('+ tx +',0)')
}
})();
