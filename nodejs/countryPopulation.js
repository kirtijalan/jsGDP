var margin = {top:20, right: 18, bottom:180, left:40},
width = 1400 - margin.right - margin.left,
height = 600 - margin.top - margin.bottom;

//SVG
var svg  = d3.select('body')
        .append('svg')
        .attr({
          "width": width + margin.right + margin.left,
          "height" : height + margin.top + margin.bottom
        })
        .append('g')
          .attr("transform","translate(" + margin.left + "," + margin.right + ")");
        // .append("g")
        //   .attr("transform","translate(" + margin.left + ',' + margin.right + ')')

//scale and axis
var xScale = d3.scale.ordinal()
  .rangeRoundBands([0,width], 0.2, 0.2);

  var yScale = d3.scale.linear()
    .range([height,0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

//json file
d3.json("./../json/data2013.json", function(error,data){
  if(error)
    console.log("Error: Data not loaded");

//converting data
data.forEach(function(d){
  d.population=+d.population;
  d.country=d.country;
  //console.log(d.population);
});

data.sort(function(a,b){
  return b.population-a.population;
});
xScale.domain(data.map(function(d){return d.country;}));
yScale.domain([0,d3.max(data,function(d){return d.population;})]);

//draw the graph
svg.selectAll('rect')
.data(data)
.enter()
.append('rect')
.attr("height",0)
.attr("y",height)
.transition().duration(3000)
.delay(function(d,i){return i*200;})
.attr({
  'x':function(d){return xScale(d.country);},
  'y':function(d){return yScale(d.population);},
  "width":xScale.rangeBand(),
  "height":function(d){return height - yScale(d.population);}
})
.style("fill",function(d,i){return 'rgb(20,20,' + ((i*30)+100)+')';});

//label the bars
svg.selectAll('text')
.data(data)
.enter()
.append('text')
.text(function(d){return d.population;})
.attr('x',function(d){return xScale(d.country) + xScale.rangeBand()/2;})
.attr('y',function(d){return yScale(d.population)+12;})
.style("fill","white")
.style("text-anchor","middle");

//draw the xAxis and yAxis
svg.append("g")
.attr("class", "x axis")
.attr("transform","translate(0," + height + ")")
.call(xAxis)
.selectAll('text')
.attr("transform","rotate(-60)")
.attr("dx","-.8em")
.attr("dy","-.23em")
.style("text-anchor","end")
.style("font-size","12px");

svg.append("g")
.attr("class", "y axis")
.call(yAxis)
.append("text")
.attr("transform", "rotate(-90)")
.attr("x", -height/2)
.attr("dy", "-3em")
.style("text-anchor", "middle")
.text("Trillions of US Dollars ($)");

});
