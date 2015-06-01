(function (){

var data = [

    	{ 	"event": "NWA hits the mainstream",
    		"eventId": 1,
    		"date": "1988-01-01",
    		"rapper": "NWA",
    		"rapAlbum": "Straight Outta Compton",
    		"albumImage": "nwa-straight-outta-compton-430.jpg",
    		"albumImageUrl": "http://www.2pacworld.co.uk/wp-content/uploads/2011/09/RunninUKCDF.jpeg",
    		"description": "The song Fuck tha Police, containing N.W.A's trademark inflammatory lyrics, stood out in particular from many of the songs on Straight Outta Compton. \
    		It highlights many of the tensions between black urban youth and the police. The song also alleged that blacks in the police were worse than the whites, with lyrics such as: \
    		\
    				But don't let it be a black and a white one \
    				'Cause they'll slam ya down to the street top \
    				Black police showing out for the white cop \
    		—Ice Cube \
    		Especially controversial were the areas of the song that appear to condone violence towards police authorities; lines such as I'm a sniper with a hell of a scope/Taking out a cop or two,\
    		they can't cope/with me and A sucka in a uniform waitin' to get shot/by me, or anotha nigga directly reference the murder of police officers."

    	},

    	{	"event": "Rise of Notorious BIG",
    		"eventId": 2,
    		"date": "1994-09-13",
    		"rapper": "Notorious BIG",
    		"rapAlbum": "Ready to Die",
    		"albumImage": "notoriousBIG-readytodie.jpg",
    		"albumImageUrl": "http://www.spencersonline.com/images/spencers/products/interactivezoom/processed/02257293.interactive.a.jpg",
    		"description": "In 1993, fledgling A&R executive and record producer Puff Daddy Sean Combs founded the New York-centered hip-hop label, Bad Boy Records. \
    		 The next year, the label’s debut releases by Brooklyn-based rapper The Notorious B.I.G. (also known as Biggie Smalls; born Christopher Wallace) and Long \
    		 Island-based rapper Craig Mack became immediate critical and commercial successes, and seemed to revitalize the East Coast hip-hop scene by 1995.[5] New York born \
    		 and California-based rapper Tupac Shakur publicly accuses The Notorious B.I.G, Andre Harrell, and Sean Combs of involvement in the robbery and shooting (shot five times) \
    		 on him in the lobby of Quad Recording Studios in Manhattan on November 30, 1994.Shortly after 2Pac’s shooting, “Who Shot Ya?,” a B-side track from BIG’s “Big Poppa” single \
    		 was released. Although Combs and Wallace denied having anything to do with the shooting and stated that “Who Shot Ya?” had been recorded before the shooting, \
    		 2Pac and the majority of the hip hop community interpreted it as B.I.G.’s way of taunting him."

    	},

    	{
    		"event": "Tupac representing East Coast",
    		"eventId": 3,
    		"date": "1991-11-12",
    		"rapper": "Tupac",
    		"rapAlbum":" 2Pacalypse Now",
    		"albumImage": "2pacalypse_now.jpg",
    		"albumImageUrl":"http://upload.wikimedia.org/wikipedia/en/8/8f/2pacalypse_now.jpg",
    		"description": "2Pacalypse Now is the debut studio album by American rapper Tupac Shakur, released on November 12, 1991.Though less polished than his later studio albums, \
    		 2Pacalypse Now is 2Pac's most overtly aggressive and political work. In it, he addresses contemporary social issues facing American society, such as racism, police brutality, \
    		 poverty, and teenage pregnancy, some issues giving a lyrical glimpse into the world of a young black man on the urban streets of the United States."
    	}
]


var parseDate = function(date) {
    dateComp = date.split('-')
    return (new Date(Number(dateComp[0]), Number(dateComp[1]) - 1, Number(dateComp[2])));
}

var margin = {top: 10, right: 10, bottom: 30, left: 10};
var width = $('.timeline').width() - margin.left - margin.right;
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
    .attr('x1', function (d){ return x(parseDate(d.date)) })
    .attr('x2', function (d){ return x(parseDate(d.date)) })
    .attr('y1', y(0))
    .attr('y2', y(1))
    .style('stroke', 'white')
    .attr('stroke-width', 1.5)

var rects = breakouts.append('rect')
    .attr('x', function (d){ return x(parseDate(d.date)) })
    .attr('y', function (d, i){ return 20; })
    .attr('class', 'content')
    .attr('width', 110)
    .attr('height', 70)
    .attr('fill', 'white')

var imgs = breakouts.append('image')
    .attr('x', function (d){ return x(parseDate(d.date)) })
    .attr('y', function (d){ return 20; })
    .attr('class', 'content')
    .attr('width', 110)
    .attr('height', 70)
    .attr('xlink:href', function (d){ return d['albumImageUrl'] })

breakouts.append('text')
    .attr('x', function (d){ return x(parseDate(d.date)) + 4 })
    .attr('y', function (d, i){ return 20 + 10; }) // height
    .attr('dy', '.35em')
    .attr('fill', 'black')
    .text(function(d) { return d['eventIdl']; })

// rects
//     .on('mouseover', function(d) {
//         var breakout = this.parentNode
//         breakout.parentNode.appendChild(breakout)
//     })

imgs
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
        location.hash = d.eventId

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
