// import {nest} from 'd3-collection';

var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Set the ranges
// var x = d3.scaleLinear().range([0, width]);
// var y = d3.scaleLinear().range([height, 0]);

// // Define the axes
// var xAxis = d3.svg.axis().scale(x)
//     .orient("bottom").ticks(5);

// var yAxis = d3.svg.axis().scale(y)
//     .orient("left").ticks(5);

// Define the line
// var valueline = d3.svg.line()
//     .x(function(d) { return x(d.airmass); })
//     .y(function(d) { return y(d.mjdExpStart); });

// Adds the svg canvas
var svg = d3.select("#my_dataviz")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


function stupidCB(data){
  var x = d3.scaleLinear()
    .domain([0, 6.3])
    .range([margin.left, width - margin.right])
    .nice();

  svg.append("g")
    .attr("transform", "translate(0," + height/2 + ")")
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
    .domain([-1, 1])
    .range([height, 0])
    .nice();

  svg.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")  // look what happens when you comment/uncomment this
    .call(d3.axisLeft(y));

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) {return x(d.x)})
        .y(function(d) {return y(d.sinx)})
    )

}

function logArrayElements(value, index, array) {
  console.log(value);
  // console.log("  mjd, alt: (" + value.mjdExpStart + ", " + value.alt + ")");
}

function logMapElements(value, key, map) {
  console.log("map: " + key);
  value.forEach(logArrayElements);

}

function csvDataCallback(data){
  console.log("csv data loaded")
  // csv makes an arrray of objects with named attributes
  console.log(data[0].mjdExpStart);
  console.log("length of full table", data.length);

  // find the mjd for the beginning of the night
  // for the same mjd, the start/stop times will all be the same
  // so just grab the top ones
  var mjdNightStart = data[0].mjdNightStart;
  var mjdNightEnd = data[0].mjdNightEnd;
  console.log(mjdNightStart);

  // the start/end times set the scale extent of the x axis
  var x = d3.scaleLinear()
    .domain([mjdNightStart, mjdNightEnd])
    .range([margin.left, width - margin.right]);
    // .nice();

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
    .domain([0, 90])
    .range([height, 0]);
    // .nice();

  svg.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")  // look what happens when you comment/uncomment this
    .call(d3.axisLeft(y));


  // make groups by field id
  var fieldGroup = d3.group(data, d => d.fieldID); // nest function allows to group the calculation per level of a factor
      // .key(function(d) { return d.fieldID;})
      // .entries(data);

  // fieldGroup.forEach(logMapElements);

  // svg.SelectAll(".line")
  svg.selectAll(".line")
    .data(fieldGroup)
    .enter()
    .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", function(d){
        return d3.line()
        .x(function(d) {return x(d.mjdExpStart)})
        .y(function(d) {return y(d.alt)}).curve()
      })


  // svg.selectAll(".line")
  //     .data(fieldGroup)
  //     .enter()
  //     .append("path")
  //       .attr("fill", "none")
  //       .attr("stroke", "black") //function(d){ return color(d.key) })
  //       .attr("stroke-width", 1.5)
  //       .attr("d", function(d){
  //         return d3.line()
  //           .x(function(d) { return x(d.mjdExpStart); })
  //           .y(function(d) { return y(d.alt); })
  //           (d.values)
  //       });

  // // find the set of all the unique fields
  // var fieldSet = new Set(data.map(item => item.fieldID));
  // // convert it to a list
  // var fieldList = Array.from(fieldSet);

  // // find the set all the unique exposure start times
  // var expStartTimeSet = new Set(data.map(item => item.mjdExpStart));
  // // convert it to a list
  // var expStartTimeList = Array.from(expStartTimeSet);

}

function jsonDataCallback(data){
  console.log("json data loaded")
  // json makes an object, with attributes containing arrays!
  console.log(data.mjdExpStart[0]);
}


// Load Data
// d3.json("./data/scheduled.json").then(dataCallback);
// d3.json("./data/mjd-59371-sdss-fields.json").then(jsonDataCallback);
// d3.csv("./data/mjd-59310-sdss-simple.csv").then(csvDataCallback);
d3.csv("./data/stupid.csv").then(stupidCB);



// console.log(data[0]);
// some example easy svg stuff
d3
  .select(".target")  // select the elements that have the class 'target' (from html)
  .style("stroke-width", 20) // change their style: stroke width is not equal to 8 pixels

d3.selectAll('.hover-me') // hover me-from html
      .on('mouseover', function() {
        this.style.backgroundColor = 'yellow';
      })
      .on('mouseleave', function() {
        this.style.backgroundColor = '';
      });

