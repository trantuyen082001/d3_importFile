import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const Histogram = ({attr = [] ,data = [], dimensions = {}}) => {
    const svgRef = useRef(null);
    const { width, height, margin = {} } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    console.log(attr[1].items)

   useEffect(() => {
        var xScale = d3
            .scaleLinear()
            .domain(d3.extent(attr[1].items))
            .range([0, width])

        var histogram = d3.histogram()
            .value((d) => d.items)
            .domain(xScale.domain())
            .thresholds(xScale.ticks(40));

         // And apply twice this function to data to get the bins.
        var bins1 = histogram(attr[0].items.filter( function(d){return d === "Africa Region"} ));
        var bins2 = histogram(attr[0].items.filter( function(d){return d === "Region of the Americas"} ));

        var yScale = d3
            .scaleLinear()
            .range([height, 0])
            yScale.domain([Math.min(...data[0].items), Math.max(...data[0].items)]);

        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove(); // Clear svg content before adding new elements
        const svg = svgEl
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add X grid lines with labels
        const xAxis = d3
            .axisBottom(xScale)
            .ticks(5)
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
   },[attr,data])



  return (
    <svg ref={svgRef} width={svgWidth} height={svgHeight} />
  )
}

export default Histogram