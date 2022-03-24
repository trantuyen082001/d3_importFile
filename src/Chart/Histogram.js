import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const Histogram = ({data = [], dimensions = {}}) => {
    const svgRef = useRef(null);
    const { width, height, margin = {} } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;


   useEffect(() => {
        var xScale = d3
        .scaleTime()
        .domain(d3.extent(data[0].items.slice(0,18), (d) => d.date))
        .range([0, width]);

        var histogram = d3.histogram()
            .value((d) => d.items)
            .domain(xScale.domain())
            .thresholds(xScale.ticks(40));

        var bins = histogram(data);

        var yScale = d3
            .scaleLinear()
            .domain([0, d3.max(bins, function(d) { return d.length; })])
            .range([height, 0])

        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove(); // Clear svg content before adding new elements
        const svg = svgEl
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add X grid lines with labels
        const xAxis = d3
            .axisBottom(xScale)
            .ticks(14)
            .tickSize(-height + margin.bottom);

        const xAxisGroup = svg
            .append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(xAxis);

        xAxisGroup.select(".domain").remove();
        xAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
        xAxisGroup
              .selectAll("text")
              .attr("opacity", 0.5)
              .attr("color", "white")
              .attr("font-size", "0.75rem");

        // Add Y grid lines with labels
        const yAxis = d3
            .axisLeft(yScale)
            .ticks(5)
            .tickSize(-width)
            .tickFormat((val) => `${val}`);

        const yAxisGroup = svg.append("g").call(yAxis);
            yAxisGroup.select(".domain").remove();
            yAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
            yAxisGroup
              .selectAll("text")
              .attr("opacity", 0.5)
              .attr("color", "white")
              .attr("font-size", "0.75rem");

        // append the bar rectangles to the svg element
        // svg.selectAll("rect")
        //     .data(bins)
        //     .enter()
        //     .append("rect")
        //         .attr("x", 1)
        //         .attr("transform", function(d) { return "translate(" + xScale(d.x0) + "," + yScale(d.length) + ")"; })
        //         .attr("width", function(d) { return xScale(d.x1) - xScale(d.x0) -1 ; })
        //         .attr("height", function(d) { return height - yScale(d.length); })
        //         .style("fill", "#69b3a2")
   },[data])



  return (
    <svg ref={svgRef} width={svgWidth} height={svgHeight} />
  )
}

export default Histogram