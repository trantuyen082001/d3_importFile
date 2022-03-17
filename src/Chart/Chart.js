import React, {useRef, useEffect} from 'react'
import * as d3 from "d3";

const Chart = ({ data = [], dimensions = {} }) => {

  const svgRef = useRef(null);
  const {width, height, margin= {}} = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  console.log(data[0]) // year
  console.log(data[1]) // days
  console.log(data[2]) // months


  useEffect(() => {


     const xScale = d3.scaleBand()
        .domain(data[0].items.slice(0,18).reverse())
        .range([0,width])

    const yScale = d3
        .scaleLinear()
        .domain([Math.min(...data[1].items), Math.max(...data[1].items)])
        .range([height,0]);

    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove();
    const svg = svgEl
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xAxis = d3
        .axisBottom(xScale)
        .ticks(5)
        .tickSize(-height + margin.bottom);

    const xAxisGroup = svg
        .append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

    xAxisGroup.select('.domain').remove();
    xAxisGroup.selectAll('line').attr('stroke', "rgba(255, 255, 255, 0.2)");
    xAxisGroup.selectAll('text')
              .attr('opacity', 0.5)
              .attr('color', 'white')
              .attr('font-size', '0.75rem');
    
    const yAxis = d3.axisLeft(yScale)
        .ticks(5)
        .tickSize(-width)
        .tickFormat((val) =>`${val}`);
    
    const yAxisGroup = svg.append('g').call(yAxis);
    yAxisGroup.select('.domain').remove();
    yAxisGroup.selectAll('line').attr("stroke", "rgba(255, 255, 255, 0.2)");
    yAxisGroup
        .selectAll('text')
        .attr('opacity', 0.5)
        .attr('color', 'white')
        .attr('font-size', '0.75rem');
      
    const line = d3
        .line()
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.value));

    console.log(line)

    svg
      .selectAll(".line")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 3)
      .attr("d", (d) => line(d.items));

    
  }, [data])

  return (
    <svg ref={svgRef} width={svgWidth} height={svgHeight}/>
  )
}

export default Chart;