import React, { useRef, useMemo, useEffect } from 'react';
import * as d3 from 'd3';

const Chart = ({ data = [], dimensions = {} }) => {

  const svgRef = React.useRef(null);
  const { width, height, margin = {} } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;


  useEffect(() => {

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].items.slice(0,18), (d) => d.date))
      .range([0, width]);

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
      .attr("transform", `translate(0, ${height - margin.bottom + 30})`)
      .call(xAxis);

      xAxisGroup.select(".domain").remove();
      xAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
      xAxisGroup
        .selectAll("text")
        .attr("opacity", 0.5)
        .attr("color", "white")
        .attr("font-size", "0.75rem");


      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(data[0].items.slice(0,18), (d) => d.value) - 10,
          d3.max(data[0].items.slice(0,18), (d) => d.value) + 10
        ])
        .range([height, 0]);

      const yAxis = d3
        .axisLeft(yScale)
        .ticks(10)
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
      /*
    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data[0].items.slice(0,18), (d) => d.value) -10,
        d3.max(data[0].items.slice(0,18), (d) => d.value) + 10
      ])
      .range([height, 0]);

      console.log(d3.min(data[0].items.slice(0,18), (d) => d.value))

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

    const yAxis = d3
      .axisLeft(yScale)
      .ticks(10)
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
      */

    // Draw the lines
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value));

    svg
      .selectAll(".line")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 3)
      .attr("d", (d) => line(d.items.slice(0,18)));

      console.log(data)
  }, [data])



  return (
    <svg ref={svgRef} width={svgWidth} height={svgHeight} />
  )
}

export default Chart