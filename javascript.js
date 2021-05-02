d3
  .select(".target")  // select the elements that have the class 'target'
  .style("stroke-width", 20) // change their style: stroke width is not equal to 8 pixels

d3.selectAll('.hover-me')
      .on('mouseover', function() {
        this.style.backgroundColor = 'yellow';
      })
      .on('mouseleave', function() {
        this.style.backgroundColor = '';
      });