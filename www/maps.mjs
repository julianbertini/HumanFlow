var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var legends = ["Chambers", "Union", "Libs", "Wall"];

var parseForHourly = (day, month, results) => {

  // counts for each hour of a day
  var chambersCountsPerHour = new Array(24).fill(0),
  unionCountsPerHour = new Array(24).fill(0),
  libsCountsPerHour = new Array(24).fill(0),
  wallCountsPerHour = new Array(24).fill(0),
  buildings = new Array(4).fill(new Array());

  buildings[0] = chambersCountsPerHour;
  buildings[1] = unionCountsPerHour;
  buildings[2] = libsCountsPerHour;
  buildings[3] = wallCountsPerHour;

  // there is an erroneous data value at index 0; not sure why
  var i = 1;
      i_c = 0,
      i_l = 0,
      i_w = 0,
      i_u = 0;

  while (i < results.hourlyValues.length) {

      if (+results.hourlyValues[i].day > day) {
          if (+results.hourlyValues[i].month == month) {
              break;
          }
      }

      var row = results.hourlyValues[i];
      if (+row.day == day && +row.month == month) {

          if ("Chambers".localeCompare(row.building) == 0) {
              buildings[0][i_c] = +row.count;
              i_c++;
          } 
          else if ("Libs".localeCompare(row.building) == 0) {
              buildings[2][i_l] = +row.count;
              i_l++;
          } 
          else if ("WALL".localeCompare(row.building) == 0) {
              buildings[3][i_w] = +row.count;
              i_w++;
          } 
          else if("Union".localeCompare(row.building) == 0) {      
              buildings[1][i_u] = +row.count;
              i_u++;
          }
      }

      i++;
  }

  return buildings;

}

var renderMaps = () => {
  console.log("Getting results for stacked...");
  var search_url = "get_count_results.php"
  $.ajax({
      url: search_url,
      context: document.body
    }).done(function(data) {
        console.log("done fetching results...")
        results = JSON.parse(data);
        displayGroupedStacked(results);
        displayPlateletMap(results);
    });
}


var displayGroupedStacked =  (results) => {
  
        var day = 27, month = 4,
            buildings = parseForHourly(day,month,results);

        var n = 4 // number of series
        var m = 24 // number of values per series
        var xz = d3.range(m) // the x-values shared by all series

        // instead of bumps(m), i need an array of counts at each hour for
        var yz = d3.range(n).map((i) => buildings[i]); // the y-values of each of the n series
        var y01z = d3.stack()
          .keys(d3.range(n))
        (d3.transpose(yz)) // stacked yz
        .map((data, i) => data.map(([y0, y1]) => [y0, y1, i]));

        var yMax = d3.max(yz, y => d3.max(y));
        var y1Max = d3.max(y01z, y => d3.max(y, d => d[1]));

        var x = d3.scaleBand()
          .domain(xz)
          .rangeRound([margin.left, width - margin.right])
          .padding(0.08);

        var y = d3.scaleLinear()
          .domain([0, y1Max])
          .range([height - margin.bottom, margin.top]);

        var z = d3.scaleSequential(d3.interpolateMagma)
          .domain([-0.5 * n, 1.5 * n]);

        var svg = d3.select("#grouped-stacked-map").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xAxis = svg => svg.append("g")
                              .attr("transform", `translate(0,${height - margin.bottom})`)
                              .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat((hour) => hour))


        // to indicate what color each building belongs to
        d3.select("#grouped-stacked-legend")
          .selectAll("div")
          .data(legends)
          .enter().append("div")
          .style("width", (d) => d.length*10 + "px")
          .style("background-color", (d, i) => z(i))
          .text((d) => d)
          .style("color", "#f8f9fa")
          .style("text-align", "center");

           

        var chart =  {

            rect : svg.selectAll("g")
            .data(y01z)
            .enter().append("g")
              .attr("fill", (d, i) => z(i))
            .selectAll("rect")
            .data(d => d)
            .join("rect")
              .attr("x", (d, i) => x(i) )
              .attr("y", height - margin.bottom)
              .attr("width", x.bandwidth())
              .attr("height", 0),

          transitionStacked: function() {
            y.domain([0, yMax]);

            svg.call(xAxis)

            this.rect.transition()
                .duration(500)
                .delay((d, i) => i * 20)
                .attr("x", (d, i) => x(i) + x.bandwidth() / n * d[2])
                .attr("width", x.bandwidth() / n)
              .transition()
                .attr("y", d => y(d[1] - d[0]))
                .attr("height", d => y(0) - y(d[1] - d[0]));
          },

          transitionGrouped: function() {
            y.domain([0, y1Max]);

            svg.call(xAxis)

            // I think the transition order here makes it update all y values of rect groups, then x values,
            // that's why animation goes vertical first then horizontal
            this.rect.transition()
                .duration(500)
                .delay((d, i) => i * 20)
                .attr("y", d => y(d[1]))
                .attr("height", d => y(d[0]) - y(d[1]))
              .transition()
                .attr("x", (d, i) => x(i))
                .attr("width", x.bandwidth());
          }
        }
        chart.transitionGrouped();
}


var displayPlateletMap = (results) => {

  var day = 27, month = 4,
      buildings = parseForHourly(day,month,results);

  var data = [{"population":buildings[0][1]},
              {"population":buildings[1][1]},
              {"population":buildings[2][1]},
              {"population":buildings[3][1]}];
    
              var color = d3.scaleOrdinal()
              .domain(data.map(d => d.population))
              .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())
  
var pie = d3.pie()
            .value(d => d.population)
            .padAngle(0.04)
            .sort(null);
  
var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(Math.min(width, height) / 2 - 1)
            .cornerRadius(100)
  
var g = d3.select("#platelet-map").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = g.datum(data).selectAll("path")
            .data(pie)
          .enter().append("path")
            .attr("fill", d => color(d.data.population))
            .attr("d", arc)
            .each( d => {this._current = d});

            var arcs = pie(data)
            var centers = [];
            arcs.forEach( (d) => {
              var c = arc.centroid(d);
              centers.push(c)
              console.log(d);
              console.log(c)
            });

        // to indicate what color each building belongs to
        d3.select("#platelet-legend")
          .selectAll("div")
          .data(legends)
          .enter().append("div")
          .style("width", (d) => d.length*10 + "px")
          .style("background-color", (d, i) => color(i))
          .text((d) => d)
          .style("color", "#f8f9fa")
          .style("text-align", "center");
            
  
var change = (newData) => {
      console.log("changin..")
      path = path.data(pie(newData)); // compute the new angles
      path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
}
  

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

window.setInterval( () => {
  if (buildings[0].length <= 0) {
    clearInterval();
  } else {
    console.log("changing...")
    data = [{"population":buildings[0].shift()},
                {"population":buildings[1].shift()},
                {"population":buildings[2].shift()},
                {"population":buildings[3].shift()}];
    change(data)
  }
}, 750);

}

renderMaps();